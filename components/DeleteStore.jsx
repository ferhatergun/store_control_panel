import React from 'react'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Tooltip } from '@mui/material';
import { deleteStore } from '@/utils';

export default function DeleteStore({id,setStores,stores,setDeleteStores}) {
  return (
    <Tooltip followCursor title="Sil" placement='top' onClick={()=>deleteStore(id,setStores,stores,setDeleteStores)}
    className='bg-secondary shadow-md p-1 rounded-md cursor-pointer'>
      <DeleteOutlinedIcon fontSize='large' />
    </Tooltip>
  )
}
