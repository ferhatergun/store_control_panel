"use client"
import React ,{useState,useRef}from 'react';
import { Checkbox ,Badge,Chip} from '@mui/material';
import OpenModal from '@/components/OpenModal';
import DeleteStore from '@/components/DeleteStore';
import { filterNumber, filterOptions } from '@/utils';
import { FaSortAlphaDown } from "react-icons/fa";
import { FaSortAlphaDownAlt } from "react-icons/fa";



export default function Home() {
  // servere istek atıp gelen verileri burada tutulur state ye gerek kalmaz
  const [stores, setStores] = useState([])
  const [deleteStores, setDeleteStores] = useState([])
  const [filterOption, setFilterOption] = useState('a-z') // filtreleme seçeneği

  const [checkboxes, setCheckboxes] = useState(Array(stores.length).fill(false));
  // mağaza uzunluğuna bir dizi oluşturur ve false değerlerle doldurur

  const selectAllCheckboxes = () => {
    // tüm checkboxları true yapar
    setCheckboxes(Array(stores.length).fill(true));
  };
  const handleCheckboxChange = (index) => { // checkboxun durumunu değiştirir true false
    const newCheckboxes = [...checkboxes];
    newCheckboxes[index] = !newCheckboxes[index];
    setCheckboxes(newCheckboxes);
  };



  const badgeSty={
    '& .MuiBadge-badge': {
      right: 7,
      top: 0,
      padding: '0 4px',
      backgroundColor: '#6366f1',
      color:'white',
    },
  }

  return (
    <div className='flex flex-col md:items-center mt-12 '>
      <div>
        <div className='flex justify-between items-center lg:px-0 md:px-10 px-5'>
          <div>Mağazalar</div>
          <div className='flex items-center gap-2'> 
          {
            deleteStores.length > 0 &&
            <Badge badgeContent={deleteStores.length} sx={badgeSty}>
              <DeleteStore
              id={deleteStores}
              setStores={setStores}
              stores={stores}
              setDeleteStores={setDeleteStores}
              />
            </Badge>
          }
            <OpenModal 
            Title={"Mağaza Ekle"} 
            setStores={setStores} 
            stores={null} 
            style={"md:p-3 p-2 bg-btnColor md:gap-3 gap-2 text-white"}
            storesAll={stores}
            />
          </div>
        </div>
        

      <div className='w-[100%] block overflow-x-scroll md:px-0 px-4 '>
      <table border={2} className='bg-primary shadow-lg rounded-md m-auto mt-5 ' key={stores}>
        <tbody>
          <tr className='border-black-200 border-b-[1px]'>
            <td colSpan={7} className='p-3'>Tüm Mağazalar <span className='font-light text-gray-400'>{stores.length}</span>
            <Chip label={<FaSortAlphaDown size={20}/>} className='ml-2 mr-2' clickable
            variant={filterOption === 'z-a' ? "outlined" : 'filled'}
            onClick={()=>setFilterOption('a-z')}/>
            <Chip label={<FaSortAlphaDownAlt size={20}/>} clickable variant={filterOption === 'z-a' ? "filled" : 'outlined'}
            onClick={()=>setFilterOption('z-a')}/>

            
             </td>
          </tr>
          <tr className='border-black-200 border-b-[1px]
          bg-shadow py-16 text-gray-500'>
            <th className='md:w-20 w-52 text-left py-3 md:px-3 px-1'>
              <Checkbox size='small' sx={{
                 '&.Mui-checked': {
                  color: '#6366f1',
                },
              }}
              onChange={(e)=>{
                if(e.target.checked){ // tüm checkboxları seçer
                  selectAllCheckboxes()
                  setDeleteStores(stores.map((store)=>store.id))
                  // tüm mağazaların idlerini silinecek mağazalar dizisine atar
                }
                else{// tüm checkboxları kaldırır
                  setCheckboxes(Array(stores.length).fill(false))
                  setDeleteStores([])
                }
              }}
              />
            </th>
            <th className='md:w-28 w-52 text-left py-3 pl-2 font-semibold cursor-pointer
            md:text-base text-sm'
            onClick={()=>filterOptions(stores,setStores,'storeName',filterOption)}
            >
              İsim
            </th>
            <th className='md:w-28 w-52 text-left py-3 pl-2 font-semibold cursor-pointer
            md:text-base text-sm'
            onClick={()=>filterOptions(stores,setStores,'country',filterOption)}
            >
              Ülke
            </th> 
            <th className='md:w-28 w-52 text-left py-3 pl-2 font-semibold cursor-pointer
            md:text-base text-sm'
            onClick={()=>filterOptions(stores,setStores,'city',filterOption)}
            >
              Eyalet
            </th>
            <th className='md:w-28 w-52 text-left py-3 pl-2 font-semibold md:text-base text-sm'>Telefon</th>
            <th className='md:w-28 w-52 md:table-cell hidden md:text-base text-sm cursor-pointer
            pr-1 text-left pl-2 py-3 font-semibold'
            onClick={()=>filterNumber(stores,setStores,'maxDiscount',filterOption == 'a-z' ? 'azalan':'artan')}>
              Max İndirim
            </th>
            <th className='md:w-28 w-52 md:table-cell hidden md:text-base text-sm cursor-pointer
            text-left py-3 pl-2 font-semibold'
            onClick={()=>filterNumber(stores,setStores,'maxPrim',filterOption == 'a-z' ? 'azalan':'artan')}>
              Max Prim
            </th>
            <th className='md:w-28 w-52 text-left py-3 pl-2 font-semibold md:text-base text-sm'>Açıklama</th>
            <th className='md:w-28 w-52 text-left py-3 pl-2 font-semibold'></th>
          </tr>
          {
            stores.map((store,index)=>(
              <tr className='border-black-200 border-b-[1px] ' key={index}>
                <td className='py-3 md:px-3 px-1'>
                  <Checkbox 
                  sx={{
                    '&.Mui-checked': {
                     color: '#6366f1',
                   },
                 }}
                  checked={
                    checkboxes[index] || false
                  }
                  
                  size='small'
                  onChange={(e)=>{
                    handleCheckboxChange(index)
                    if(e.target.checked){ // checkbox seçiliyse silinecek mağazalar dizisine id yi ekler
                      setDeleteStores((prev)=>[...prev,store.id])
                    }
                    else{// checkbox seçmeyi kaldırırsa silinecek mağazalar dizisinden id yi çıkarır
                      const updatedDeleteStores = deleteStores.filter((deleteStore)=>deleteStore !== store.id)
                      setDeleteStores(updatedDeleteStores)
                    }
                  }}
                  />
                </td>
                <td className='py-3 pl-2 md:text-base text-sm'>{store.storeName}</td>
                <td className='pl-2 md:text-base text-sm'>{store.country}</td>
                <td className='pl-2 md:text-base text-sm'>{store.city}</td>
                <td className='pl-2 md:text-base text-sm'>{store.phone}</td>
                <td className='pl-2 md:text-base text-sm md:table-cell hidden '>{store.maxDiscount}</td>
                <td className='pl-2 md:text-base text-sm md:table-cell hidden '>{store.maxPrim}</td>
                <td className='pl-2 md:text-base text-sm'>
                  {
                    store.description.length > 20 ? store.description.slice(0,20) + '...' : store.description
                  }
                </td>
                <td className='pl-2 md:text-base text-sm'>
                  <div className='flex justify-center gap-3'>
                    <DeleteStore id={store.id} setStores={setStores} stores={stores}/> 
                    <OpenModal 
                    Title={"Güncelle"} 
                    setStores={setStores} 
                    store={store}
                    style={"bg-secondary shadow-md p-1 rounded-md"}
                    storesAll={stores}
                    />
                  </div>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      </div>
      </div>
    </div>
  );
}
