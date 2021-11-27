import React, { useState } from 'react';
import { Divider, IconButton } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import '../styles/components/ResourceListItem.scss';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import NewResource from './NewResource';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmDialog from './ConfirmDialog';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ResourceListItem(props) {
  const { _id, title, resource_url} = props.resources;
  const [resources, setResources] = useState(props.resources);
  const [openNewResource, setOpenNewResource] = useState(false);
  const [openDeleteResource, setOpenDeleteResource] = useState(false);
  
  const navigate = useNavigate();

  const userInfo = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(resources);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setResources(items);
  }

  const handleOpenNewResource = () => {
    setOpenNewResource(true);
  };

  const handleCloseNewResource = () => {
    setOpenNewResource(false);
  };

  const handleOpenDeleteResource = () => {
    setOpenDeleteResource(true);
  };

  const handleCloseDeleteResource = () => {
    setOpenDeleteResource(false);
  };

  const deleteResourceHandler = (id) => {
    Axios.delete(`/api/resources/${id}`, 
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
    navigate("/resources");
  }

  return (
    <div >
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="resources">
            {(provided) => (
              <ul className="resources" {...provided.droppableProps} ref={provided.innerRef}>
                { props.resources && props.resources.map((resource, index) => {
                  return (
                    <Draggable key={resource._id} draggableId={resource._id} index={index}>
                      {(provided) => (
                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <div>
                            <h6>
                              { resource.title }
                            </h6>
                            <IconButton size="small" variant="outlined" onClick={handleOpenNewResource}>
                            <ModeEditIcon />
                            </IconButton>
                            <NewResource openNewResource={openNewResource} handleCloseNewResource={handleCloseNewResource} edit={true} resource={props.resources} id={_id}/>
                            <IconButton size="small" variant="outlined" onClick={handleOpenDeleteResource}>
                              <DeleteIcon />
                            </IconButton>
                            <ConfirmDialog
                              title="Delete Resource?"
                              openDelete={openDeleteResource}
                              handleCloseDelete={handleCloseDeleteResource}
                              onConfirm={() => deleteResourceHandler(resource._id)}>
                              Are you sure you want to delete this resource?
                            </ConfirmDialog>
                          </div>
                          <Divider />
                          <a href={ resource.resource_url }>
                          { resource.resource_url }
                          </a>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
    </div>
  );
}

export default ResourceListItem;
