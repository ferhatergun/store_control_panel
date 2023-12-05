import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';




export const addStore = (values,setStores,resetForm,setErrors,handleClose,storesAll) => {
    console.log(storesAll)
    const isStoreNameExist = storesAll.find((store) => store.storeName == values.storeName)
    const isStorePhoneExist = storesAll.find((store) => store.phone == values.phone)
    if(isStoreNameExist && isStorePhoneExist){
        setErrors({ storeName: 'Mağaza İsmi Kullanılıyor',phone: 'Telefon Kullanılıyor' })
    }
    else if (isStoreNameExist) {
        setErrors({ storeName: 'Mağaza İsmi Kullanılıyor' })
    }
    else if (isStorePhoneExist) {
        setErrors({ phone: 'Telefon Kullanılıyor' })
    }
    else{
        values.id = uuidv4()
        setStores((prev)=>[...prev,values])
        resetForm() 
        toast.success('Mağaza Eklendi')
        handleClose()
    }
    
}

export const updateStore = (values, setStores,resetForm,setErrors,handleClose,storesAll) => {
    const isStoreNameExist = storesAll.filter((store)=>store.id !== values.id)
    .find((store) => store.storeName == values.storeName)
    const isStorePhoneExist = storesAll.filter((store)=>store.id !== values.id)
    .find((store) => store.phone == values.phone)
    if(isStoreNameExist && isStorePhoneExist){
        setErrors({ storeName: 'Mağaza İsmi Kullanılıyor',phone: 'Telefon Kullanılıyor' })
    }
    else if (isStoreNameExist) {
        setErrors({ storeName: 'Mağaza İsmi Kullanılıyor' })
    }
    else if (isStorePhoneExist) {
        setErrors({ phone: 'Telefon Kullanılıyor' })
    }
    else{
        const updatedStores = storesAll.map((store)=>store.id === values.id ? values : store)
        setStores(updatedStores)
        toast.success('Mağaza Güncellendi')
        resetForm() 
        handleClose()
    }

}

export const deleteStore = (id,setStores,storesAll,setDeleteStores) => {
    const updatedStores = storesAll.filter((store) => (
        Array.isArray(id) ? !id.includes(store.id) : store.id !== id
      ));
      
    toast.success('Mağaza Silindi')
    setStores(updatedStores)
    if(setDeleteStores){
        setDeleteStores([])
    }
}

export const filterOptions = (stores,setStores,query,filterOption) => {
    const sortedStores = [...stores].sort((a, b) =>
        filterOption === 'a-z' ? a[query].localeCompare(b[query], 'tr') : b[query].localeCompare(a[query], 'tr')
    )
    setStores(sortedStores)
    console.log(sortedStores)
} 

export const filterNumber = (stores, setStores, query,filterOption) => {
    console.log(filterOption)
    const sortedStores = [...stores].sort((a, b) => 
        filterOption === 'azalan' ? a[query] - b[query] : b[query] - a[query]);
    setStores(sortedStores);
    console.log(sortedStores);
  };
  