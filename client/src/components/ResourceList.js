import '../styles/components/ResourceList.scss';
import ResourceListItem from './ResourceListItem';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listResources } from '../actions/resourceActions';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { IconButton, Divider } from '@mui/material';
import NewResource from './NewResource';

function ResourceList(props) {
  const { _id, title } = props.resourceCategory;
  const [openNewResource, setOpenNewResource] = useState(false);

  const resourceList = useSelector((state) => state.resourceList);
  const { resources } = resourceList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listResources({resourceCategory: _id}))
  },[]);

  const handleOpenNewResource = () => {
    setOpenNewResource(true);
  };

  const handleCloseNewResource = () => {
    setOpenNewResource(false);
  };
 
  return (
    <div class='resource-list-container'>
      <div class='resource-list'>
      <h2>{title}</h2>
      <IconButton onClick={handleOpenNewResource}>
         <AddCircleOutlineIcon />
      </IconButton>
      </div>
      <Divider />
      <NewResource openNewResource={openNewResource} handleCloseNewResource={handleCloseNewResource} id={_id} edit={false} />
      
      {resources && 
        <ResourceListItem resources={resources}/>
      }
    </div>
  );
}
export default ResourceList;