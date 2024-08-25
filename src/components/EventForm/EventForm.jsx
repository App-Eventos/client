import React, { useState, useContext } from 'react';
import { Calendar, Button, Form, Input, DatePicker, Select, Radio, Upload, Checkbox, List, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment';
import 'antd/dist/reset.css';
import './EventForm.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppProvider';

const { Option } = Select;

const EventForm = ({ onCreate }) => {
  const [isPrivate, setIsPrivate] = useState(false);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [isOtherCategory, setIsOtherCategory] = useState(false);
  const navigate = useNavigate();
  // const { state } = useContext(AppContext);


  //Conexion con la base de datos 
  const handleFormSubmit = async (values) => {
    
    try {
      const newEvent = { //se crea un objeto con los nuevos valores ingresados por el usuario
        ...values,
        price: values.access === 'privado' ? values.price : 'Gratuito',
        start: values.date[0].format('YYYY-MM-DD HH:mm'),
        end: values.date[1].format('YYYY-MM-DD HH:mm'),
        image: fileList[0]?.originFileObj,
      };

      const url = 'http://localhost:8080/event/new';
      const response = await axios.post(url, newEvent, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'token_user': localStorage.getItem('token'), // Envía el token aquí

        }
      });

      navigate('/');

    } catch (error) {
      console.log('Error de solicitud:', error.response?.data || error.message);
    }

    // form.resetFields();
    // setFileList([]);
    // setIsPrivate(false);
    // setIsOtherCategory(false);

  };

  const handleAccessChange = (e) => {
    setIsPrivate(e.target.value === 'privado');
  };

  const handleCategoryChange = (value) => {
    setIsOtherCategory(value === 'otros');
  };

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };

  //Funcion para editar el evento
  // const handleEditEvent = (event) => {
  //   setEditingEvent(event);
  //   form.setFieldsValue({
  //     ...event,
  //     date: [moment(event.start), moment(event.end)],
  //   });
  //   setIsPrivate(event.access === 'privado');
  //   setFileList(event.image ? [{ uid: '-1', name: event.image.name, status: 'done', url: event.image }] : []);
  // };

  //Funcion para eliminar el evento
  // const handleDeleteEvent = async (event) => {
  //   Modal.confirm({
  //     title: '¿Estás seguro que deseas eliminar este evento?',
  //     onOk: async () => {
  //       try {
  //         await axios.delete(`http://localhost:8080/event/delete/${event._id}`);
  //         setEvents(events.filter((ev) => ev._id !== event._id));
  //       } catch (error) {
  //         console.error('Error al eliminar el evento:', error);
  //       }
  //     },
  //   });
  // };

  // const cellRender = (value) => {
  //   const formattedDate = value.format('YYYY-MM-DD');
  //   const currentDayEvents = events.filter(
  //     (event) => formattedDate >= event.start.split(' ')[0] && formattedDate <= event.end.split(' ')[0]
  //   );

  //   return (
  //     <ul className="events">
  //       {currentDayEvents.map((event, index) => (
  //         <li key={index}>
  //           <strong>{event.title}</strong>
  //           <em>{moment(event.start).format('HH:mm')} - {moment(event.end).format('HH:mm')}</em>
  //           <span>{event.description}</span>
  //           {/* <span>{event.status}</span> */}
  //         </li>
  //       ))}
  //     </ul>
  //   );
  // };

  return (
    <div className="event-form-container">
      <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
        <Form.Item
          name="title"
          label="Nombre del evento"
          rules={[{ required: true, message: 'Por favor, introduce el nombre del evento' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="category"
          label="Categoría"
          rules={[{ required: true, message: 'Por favor, selecciona una categoría' }]}
        >
          <Select onChange={handleCategoryChange}>
            <Option value="teatro">Teatro</Option>
            <Option value="musica">Música</Option>
            <Option value="peliculas">Películas</Option>
            <Option value="taller">Taller</Option>
            <Option value="gastronomia">Gastronomía</Option>
            <Option value="automovilismo">Automovilístico</Option>
            <Option value="juegos">Juegos</Option>
            <Option value="exposicion">Exposición</Option>
            <Option value="conferencia">Conferencia</Option>
            <Option value="deportes">Deportes</Option>
            <Option value="otros">Otros</Option>
          </Select>
        </Form.Item>

        {isOtherCategory && (
          <Form.Item
            name="otherCategory"
            label="Especificar Categoría"
            rules={[{ required: true, message: 'Por favor, especifica la categoría' }]}
          >
            <Input />
          </Form.Item>
        )}

        <Form.Item
          name="access"
          label="Acceso"
          rules={[{ required: true, message: 'Por favor, selecciona el tipo de acceso' }]}
        >
          <Radio.Group onChange={handleAccessChange}>
            <Radio value="libre">Libre</Radio>
            <Radio value="privado">Privado</Radio>
          </Radio.Group>
        </Form.Item>

        {isPrivate && (
          <Form.Item
            name="price"
            label="Precio de la entrada"
            rules={[{ required: true, message: 'Por favor, introduce el precio de la entrada' }]}
          >
            <Input />
          </Form.Item>
        )}

        <Form.Item
          name="restriction"
          label="Restricción"
          rules={[{ required: true, message: 'Por favor, selecciona una restricción' }]}
        >
          <Select>
            <Option value="mayores18">Mayores de 18</Option>
            <Option value="mayores16">Mayores de 16</Option>
            <Option value="no_ninos">No se admiten niños</Option>
            <Option value="no_mascotas">No se admiten mascotas</Option>
            <Option value="todo_publico">Apto para todo público</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="address"
          label="Ubicación del evento"
          rules={[{ required: true, message: 'Por favor, introduce la ubicación del evento' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phoneContact"
          label="Número de Teléfono o Email"
          rules={[{ required: true, message: 'Por favor, introduce un número de teléfono o email para contacto' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="image"
          label="Subir imagen"
        >
          <Upload
            listType="picture"
            fileList={fileList}
            onChange={handleUploadChange}
            beforeUpload={() => false} // Evita la carga automática
          >
            <Button icon={<UploadOutlined />}>Seleccionar Imagen</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          name="description"
          label="Descripción del evento"
          rules={[{ required: true, message: 'Por favor, introduce la descripción del evento' }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          name="date"
          label="Fecha y hora del evento"
          rules={[{ required: true, message: 'Por favor, selecciona el rango de fecha y hora' }]}
        >
          <DatePicker.RangePicker
            showTime={{ format: 'HH:mm' }}
            format="YYYY-MM-DD HH:mm"
            style={{ width: '100%' }}
          />
        </Form.Item>
        {/* 
        <Form.Item
          name="status"
          label="Estado del evento"
          rules={[{ required: true, message: 'Por favor, selecciona el estado del evento' }]}
        >
          <Select>
            <Option value="activo">Activo</Option>
            <Option value="cancelado">Cancelado</Option>
            <Option value="suspendido">Suspendido</Option>
          </Select>
        </Form.Item> */}

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Crear
          </Button>
          <Button type="default" style={{ marginLeft: '10px' }} onClick={() => navigate("/")}>
            Cancelar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EventForm;
