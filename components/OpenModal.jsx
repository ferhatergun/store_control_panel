"use client";
import React, { useState } from "react";
import { Modal, TextField, Autocomplete ,OutlinedInput,InputAdornment, Tooltip} from "@mui/material";
import { Collapse } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import { Formik ,useFormik } from "formik"
import * as Yup from "yup"
import { addStore, updateStore } from "@/utils";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { StoreSharp } from "@mui/icons-material";




export default function OpenModal({ Title , setStores, store ,style ,storesAll}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const addStoreSchema = Yup.object().shape({
    storeName: Yup.string().required("Mağaza İsmi Zorunludur"),
    country: Yup.string().required("Ülke Zorunludur"),
    city: Yup.string().required("Eyalet Zorunludur"),
    adress: Yup.string().required("Açık Adres Zorunludur"),
    phone: Yup.string()
    .matches(/^\d{11}$/, 'Telefon numarası 11 haneli olmalıdır')
    .required("Telefon Zorunludur"),
    maxDiscount: Yup.number()
    .max(100,"100 den büyük olamaz")
    .min(0,"0 dan küçük olamaz")
    .required("Max İndirim Zorunludur"),
    maxPrim: Yup.number()
    .max(100,"100 den büyük olamaz")
    .min(0,"0 dan küçük olamaz")
    .required("Max Prim Zorunludur"),
    description: Yup.string().required("Açıklama Zorunludur"),
    cities:Yup.array()
  })
  const initialValuesFormik = {
    id:Title === "Mağaza Ekle" ? "id": store?.id, // uuid bağlanacak
    storeName: Title === "Mağaza Ekle" ? "" : store?.storeName,
    country: Title === "Mağaza Ekle" ? null : store?.country,
    city: Title === "Mağaza Ekle" ? null : store?.city,
    adress: Title === "Mağaza Ekle" ? "" : store?.adress,
    phone: Title === "Mağaza Ekle" ? "" : store?.phone,
    maxDiscount: Title === "Mağaza Ekle" ? "" : store?.maxDiscount,
    maxPrim: Title === "Mağaza Ekle" ? "" : store?.maxPrim,
    description: Title === "Mağaza Ekle" ? "" : store?.description,
    cities:[]
  }
  

  const formikProps = useFormik({
    initialValues:initialValuesFormik,
    validationSchema:addStoreSchema,
    onSubmit:(values,{resetForm,setErrors}) => {
      if(Title === "Mağaza Ekle")
      addStore(values,setStores,resetForm,setErrors,handleClose,storesAll)
      else
      updateStore(values,setStores,resetForm,setErrors,handleClose,storesAll)

    }
  })
  
  
  const panelStyle = {
    background: "#ffff",
    borderRadius: 4,
    marginBottom: 24,
  };
  const getItems = () => [
    {
      key: "1",
      label: "Mağaza Bilgileri",
      children: magazaBilgileri(formikProps),
      style: panelStyle,
      className: "",
    },
    {
      key: "2",
      label: "Anlaşma Oranları",
      children: anlasmaOranları(formikProps),
      style: panelStyle,
    },
  ];



  return (
    <div>
      <div onClick={handleOpen} className={`flex items-center
       rounded-md cursor-pointer ${style}`}> 
       {
        Title == "Mağaza Ekle" ?
        <><EditOutlinedIcon/>{Title}</>
        :
        <Tooltip followCursor title={Title} placement='top'>
          <EditOutlinedIcon style={{fontSize:'27px'}}/>
        </Tooltip>
       }
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div
          className="bg-secondary border-0 fixed top-2/4 left-2/4 
        -translate-x-1/2 -translate-y-1/2 md:min-w-[700px] sm:w-[400px] w-[320px] h-[70vh] 
        p-5 shadow-lg overflow-y-auto"
        >
        <form onSubmit={formikProps.handleSubmit} 
        className="h-full flex flex-col justify-between">
          <div>
            {Title}
            <Collapse
              bordered={false}
              defaultActiveKey={["1", "2"]}
              expandIcon={({ isActive }) => (
                <CaretRightOutlined rotate={isActive ? 90 : 0} />
              )}
              className="bg-secondary mt-4 "
              items={getItems()}
            />
            <TextField 
            id="description" 
            label="Açıklama" 
            variant="outlined" 
            className="md:w-96 w-52"
            onChange={formikProps.handleChange}
            value={formikProps.values.description}
            error={formikProps.errors.description && formikProps.touched.description}
            onBlur={formikProps.handleBlur}
            helperText={(formikProps.errors.description && 
            formikProps.touched.description) && formikProps.errors.description}
            sx={erorStyles}
            />
          </div>
          <div className="flex gap-5 ml-auto">
              <div onClick={()=>{
                formikProps.resetForm()
                handleClose()
              }}
              className="p-2 rounded-md bg-secondary text-gray-500 border-[1px]
               border-gray-300 cursor-pointer mb-3"
              >
                İptal Et
              </div>
              <button type='submit' 
              className="p-2 rounded-md bg-btnColor2 text-white mb-3">
                Kaydet
              </button>
          </div>
        </form>
        </div>
      </Modal>
    </div>
  );
}

const erorStyles={
  "& .MuiFormHelperText-root.Mui-error":{
    position:'absolute',
    marginTop:'55px',
    marginLeft:0,
    fontSize:'11px',
  }
}

const magazaBilgileri = (formikProps) => {
  const [cities, setCities] = useState([]);
  return (
    <div className="flex md:flex-row flex-col p-3 gap-5">
        <div className="flex flex-col gap-5">
            <TextField 
            id="storeName" 
            label="Mağaza İsmi" 
            variant="outlined" 
            className="md:w-72 w-52"
            onChange={formikProps.handleChange}
            value={formikProps.values.storeName}
            error={formikProps.errors.storeName && formikProps.touched.storeName}
            onBlur={formikProps.handleBlur}
            helperText={(formikProps.errors.storeName && 
              formikProps.touched.storeName) && formikProps.errors.storeName}
            sx={erorStyles}
            />

            <Autocomplete
              disablePortal
              id="country"
              name="country"
              options={Country}
              className="md:w-72 w-52"
              renderInput={(params) => 
              <TextField {...params} 
              label="Ülke" 
              id="country"
              name="country"
              error={formikProps.errors.country && formikProps.touched.country}
              onBlur={formikProps.handleBlur}
              helperText={(formikProps.errors.country && 
                formikProps.touched.country) && formikProps.errors.country}
              />}
              onChange={(e,value)=>{
                formikProps.setFieldValue("country",value && value.label)
                formikProps.setFieldValue("cities",value ? value.cities:[])
              }}
              value={formikProps.values.country}
              sx={erorStyles}
              isOptionEqualToValue={(option, value) => option.label === value}
              
            />
            

            <Autocomplete
              disablePortal
              id="city"
              name="city"
              noOptionsText="Ülke Seçiniz"
              options={formikProps.values.cities}
              className="md:w-72 w-52"
              renderInput={(params) => 
              <TextField {...params} 
              label="Eyalet" 
              id="city"
              name="city"
              error={formikProps.errors.city && formikProps.touched.city}
              onBlur={formikProps.handleBlur}
              helperText={(formikProps.errors.city && 
                formikProps.touched.city) && formikProps.errors.city}
              />}
              onChange={(e,value)=>formikProps.setFieldValue("city",value && value.label)}
              value={formikProps.values.city}
              sx={erorStyles}
              isOptionEqualToValue={(option, value) => option.label === value}

            />
        </div>
        <div className="flex flex-col gap-5">
            <TextField 
            id="adress" 
            label="Açık Adres"
            variant="outlined" 
            className="md:w-72 w-52"
            onChange={formikProps.handleChange}
            value={formikProps.values.adress}
            error={formikProps.errors.adress && formikProps.touched.adress}
            onBlur={formikProps.handleBlur}
            helperText={(formikProps.errors.adress && 
              formikProps.touched.adress) && formikProps.errors.adress}
              sx={erorStyles}
            />
            <TextField 
            id="phone" 
            label="Telefon" 
            variant="outlined" 
            className="md:w-72 w-52"
            onChange={formikProps.handleChange}
            value={formikProps.values.phone}
            error={formikProps.errors.phone && formikProps.touched.phone}
            onBlur={formikProps.handleBlur}
            helperText={(formikProps.errors.phone && 
              formikProps.touched.phone) && formikProps.errors.phone}
              sx={erorStyles}
            />
        </div>
    </div>
  );
};

const anlasmaOranları = (formikProps) => {
  return(
    <div className="flex flex-col gap-5">
        <TextField
          label="Max İndirim"
          id="maxDiscount"
          InputProps={{
            startAdornment: 
            <InputAdornment position="start">
              <p className="font-bold">%</p>
            </InputAdornment>,
          }}
          className="md:w-72 w-52"
          onChange={formikProps.handleChange}
          value={formikProps.values.maxDiscount}
          error={formikProps.errors.maxDiscount && formikProps.touched.maxDiscount}
          onBlur={formikProps.handleBlur}
          helperText={(formikProps.errors.maxDiscount && 
            formikProps.touched.maxDiscount) && formikProps.errors.maxDiscount}
          sx={erorStyles}
        />
        <TextField
        label="Max Prim"
        id="maxPrim"
        InputProps={{
          startAdornment: 
          <InputAdornment position="start">
            <p className="font-bold">%</p>
          </InputAdornment>,
        }}
        className="md:w-72 w-52"
        onChange={formikProps.handleChange}
        value={formikProps.values.maxPrim}
        error={formikProps.errors.maxPrim && formikProps.touched.maxPrim}
        onBlur={formikProps.handleBlur}
        helperText={(formikProps.errors.maxPrim && 
          formikProps.touched.maxPrim) && formikProps.errors.maxPrim}
        sx={erorStyles}
        />
    </div>
  )
};

const Country = [
  { key: 1, 
    label: "Türkiye",
    cities:[
    {key:101,label:"İstanbul"},
    {key:102,label:"Ankara"},
    {key:103,label:"İzmir"},
    {key:104,label:"Adana"},
    ] },
  { key: 2, 
    label: "Almanya",
    cities:[
    {key:201,label:"Berlin"},
    {key:202,label:"Münih"},
    {key:203,label:"Köln"},
    {key:204,label:"Hamburg"},
    ] },
  { key: 3, 
    label: "İtalya",
    cities:[
    {key:301,label:"Roma"},
    {key:302,label:"Milano"},
    {key:303,label:"Napoli"},
    {key:304,label:"Torino"},
    ] },
];

