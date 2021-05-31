import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
    Card,
    CardContent,
    Checkbox,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Tooltip,
    Typography,
    InputBase,
    Paper,
    FormHelperText,
} from '@material-ui/core';
import { useRouter } from "next/router";
import useSwr from 'swr';
import {
    DragDropContext,
    Draggable,
    Droppable
} from 'react-beautiful-dnd';
import { makeStyles } from '@material-ui/core/styles';

//CONSTANTES
import { URL_API_ITEM } from '../lib/constants';

//Fetch data
import { mutate as mutateGlobal } from 'swr';
import useFetch from '../hooks/useFetch';

//ICONS
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import DoneIcon from '@material-ui/icons/Done';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
    list: {
        width: '100%',
        maxWidth: '100%',
        maxHeight: 400,
        overflow: 'auto',
        '&::-webkit-scrollbar': {
            width: '0.4em'
        },
        '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px #212121',
            webkitBoxShadow: 'inset 0 0 6px #212121'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#616161',
        }
    },
    iconButton: {
        padding: 10,
    },
    card: {
        border: 'none',
    },
    divDragging: {
        backgroundColor: `${props => (props.isDragging ? 'lightgreen' : 'white')}`,
    },
    checkbox: {
        color: theme.palette.primary.light,
        '&$checked': {
            color: theme.palette.secondary.main,
        },
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    paperInput: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        border: 'none',
        boxShadow: 'rgba(0, 0, 0, 0.3) 0 1px 3px',
    },
    helptext: {
        color: theme.palette.error.light,
    }
}));

export default function ListTask() {

    const router = useRouter();
    const classes = useStyles();
    const [checked, setChecked] = useState([]);
    const { register, handleSubmit, watch, errors } = useForm({ mode: "onChange" });
    const { data, error, mutate } = useFetch(router.query.id ? `/api/item?listId=${router.query.id}` : null);

    if (error) return <div>Failed to load list</div>
    if (!data) return <div>Loading...</div>

    //# CHECKAR TASK
    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        const dados = { _id: value, complete: true };
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            dados.complete = false;
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);


        const res = fetch(URL_API_ITEM, {
            method: "POST",
            body: JSON.stringify(dados)
        })
    };

    //# DELETAR TASK
    const handleDelete = (_id) => () => {
        const res = fetch(URL_API_ITEM, {
            method: "DELETE",
            body: JSON.stringify(_id)
        })
    }

    function handleOnDragEnd(result) {
        const { destination, source, draggableId } = result;
        if (!destination) {
            return;
        }
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }
        //data from array de tasks
        const items = Array.from(data.data);
        const [reorderedItem] = items.splice(source.index, 1);
        items.splice(destination.index, 0, reorderedItem);

        // updateCharacters({ data: items });

        const dados = { _id: draggableId, order: destination.index + 1 }

        const res = fetch(URL_API_ITEM, {
            method: "POST",
            body: JSON.stringify(dados)
        })

    }

    //INCLUIR ITEM
    const onSubmit = async (dados, e) => {
        const res = fetch(URL_API_ITEM, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dados)
        })

        mutate();
        mutateGlobal(URL_API_ITEM);
        e.target.reset();
    }

    return (
        <>
            <Grid
                container
                spacing={3}
                direction="row"
                justify="center"
                alignItems="center">
                <Grid item xs={12} sm={8}>
                    <Paper onSubmit={handleSubmit(onSubmit)} component="form" className={classes.paperInput}>
                        <InputBase
                            autoFocus
                            placeholder="Add a Item..."
                            className={classes.input}
                            inputRef={register({ required: "Item is required", maxLength: { value: 200, message: "Max lenght is 200 characters" } })}
                            type="text"
                            name="itemName"
                            inputProps={{
                                maxLength: 200,
                            }}
                        />
                        <InputBase
                            style={{ display: 'none' }}
                            name="listId"
                            type="text"
                            value={router.query.id}
                            inputRef={register({ required: "list is required" })}
                        />
                        <Tooltip title="Add">
                            <IconButton color="inherit" type="submit" className={classes.iconButton} aria-label="add">
                                <AddIcon />
                            </IconButton>
                        </Tooltip>
                    </Paper>
                    {errors.itemName && <FormHelperText className={classes.helptext}>{errors.itemName.message}</FormHelperText>}
                </Grid>
            </Grid>

            {(() => {
                if (data?.data.length === 0) {
                    return (
                        <Grid
                            container
                            spacing={0}
                            direction="column"
                            justify="center"
                            alignItems="center"
                            style={{ minHeight: '50vh' }}
                        >
                            <Grid item xs={12} sm={8}>
                                <Typography align="left" variant="h6" component="h6">You don't have any item for this list yet...</Typography>
                            </Grid>
                        </Grid>
                    )

                } else {
                    return (
                        <Grid
                            container
                            spacing={3}
                            direction="row"
                            justify="center"
                            alignItems="center">
                            <Grid item xs={12} sm={8}>
                                <Card className={classes.card}>
                                    <CardContent>
                                        <DragDropContext onDragEnd={handleOnDragEnd}>
                                            <Droppable droppableId="droppable">
                                                {(provided, snapshot) => (
                                                    <div
                                                        {...provided.droppableProps}
                                                        ref={provided.innerRef}
                                                    >
                                                        <List className={classes.list}>
                                                            {data?.data.map(({ _id, itemName, complete }, index) => {
                                                                if (!complete)
                                                                    return (
                                                                        <Draggable key={_id} draggableId={_id} index={index}>
                                                                            {(provided, snapshot) => (
                                                                                <div
                                                                                    ref={provided.innerRef}
                                                                                    {...provided.draggableProps}
                                                                                    {...provided.dragHandleProps}
                                                                                >
                                                                                    <ListItem key={_id} role={undefined} button onClick={handleToggle(_id)}>
                                                                                        <ListItemIcon>
                                                                                            {/* <Checkbox
                                                                                                className={classes.checkbox}
                                                                                                edge="start"
                                                                                                checked={checked.indexOf(_id) !== -1}
                                                                                                tabIndex={-1}
                                                                                                disableRipple
                                                                                                checkedIcon={<DoneIcon />}
                                                                                                icon={<RadioButtonUncheckedIcon />}
                                                                                            /> */}
                                                                                        </ListItemIcon>
                                                                                        <ListItemText style={{ textDecoration: checked.indexOf(_id) !== -1 ? "line-through" : "" }} primary={itemName} />
                                                                                        <ListItemSecondaryAction>
                                                                                            {/* <Tooltip title="Delete">
                                                                                                <IconButton onClick={handleDelete(_id)} color="inherit" size="small" edge="end" aria-label="delete">
                                                                                                    <DeleteOutlineIcon size="small" />
                                                                                                </IconButton>
                                                                                            </Tooltip> */}
                                                                                        </ListItemSecondaryAction>
                                                                                    </ListItem>
                                                                                </div>
                                                                            )}
                                                                        </Draggable>
                                                                    )
                                                            })}
                                                            {provided.placeholder}
                                                        </List>
                                                    </div>
                                                )}
                                            </Droppable>
                                        </DragDropContext>

                                        {/* {(() => {
                          if (completed.length !== 0) {
                            return (
                              <Accordion className={classes.accordion}>
                                <AccordionSummary
                                  expandIcon={<ExpandMoreIcon />}
                                  aria-controls="panel1a-content"
                                  id="panel1a-header"
                                >
                                  <Typography variant="caption" >Completed ({completed.length}) </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <List className={classes.list}>
                                    {data.data.map(({ _id, task, complete, order }, index) => {
                                      if (complete)
                                        return (
                                          <ListItem key={_id} role={undefined} button onClick={handleToggle(_id)}>
                                            <ListItemIcon>
                                              <Checkbox
                                                className={classes.checkbox}
                                                edge="start"
                                                checked={complete}
                                                disableRipple
                                                checkedIcon={<DoneIcon />}
                                                icon={<RadioButtonUncheckedIcon />}
                                              />
                                            </ListItemIcon>
                                            <ListItemText style={{ textDecoration: complete ? "line-through" : "" }} primary={task} />
                                            <ListItemSecondaryAction>
                                              <Tooltip title="Delete">
                                                <IconButton onClick={handleDelete(_id)} color="inherit" size="small" edge="end" aria-label="delete">
                                                  <DeleteOutlineIcon size="small" />
                                                </IconButton>
                                              </Tooltip>
                                            </ListItemSecondaryAction>
                                          </ListItem>
                                        )
                                    })}
                                  </List>
                                </AccordionDetails>
                              </Accordion>
                            )
                          }
                        })()} */}
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    )
                }
            })()}
        </>
    )
}