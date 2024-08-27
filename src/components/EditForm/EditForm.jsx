import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Calendar, Button, Form, Input, DatePicker, Select, Radio, Upload, Checkbox, List, Modal } from 'antd';
import moment from 'moment';
import { UploadOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';
import './EditForm.css';
import { message } from 'antd';

const { Option } = Select;

const EditEvent = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isOtherCategory, setIsOtherCategory] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [fileList, setFileList] = useState([]);


  // Cargar datos del evento al montar el componente
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8080/event/${id}`, {
          headers: { token_user: token }
        });
        setEvent(response.data);
      } catch (error) {
        console.error('Error fetching event:', error);
        message.error('Error al cargar los datos del evento.');
      }
    };

    fetchEvent();
  }, [id]);

  // Manejar la actualización del evento
  const handleFinish = async (values) => {

    const updatedEvent = {
      ...values,
      price: values.access === 'privado' ? values.price : 'Gratuito',
      start: values.date[0].format('YYYY-MM-DD HH:mm'),
      end: values.date[1].format('YYYY-MM-DD HH:mm'),
      image: fileList[0]?.originFileObj
    };

    console.log(updatedEvent) // con este console.log verifico que si se cambia antes de enviar 
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`http://localhost:8080/event/edit/${id}`, updatedEvent, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'token_user': token
        }
      });

      console.log(response.data) //con este console.log me doy cuenta que no se actualiza
      message.success('Evento actualizado correctamente.');
      navigate('/my-events'); // Redirigir al listado de eventos tras la actualización
    } catch (error) {
      console.error('Error updating event:', error);
      message.error('Error al actualizar el evento.');
    }
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

  return (
    <div className="edit-form-container">
      <h2>Editar Evento</h2>
      {event ? (
        <Form form={form} layout="vertical"
          initialValues={{
            title: event.title,
            description: event.description,
            date: [moment(event.start), moment(event.end)],
            address: event.address,
            category: event.category,
            restriction: event.restriction,
            price: event.price,
            access: event.access,
            phoneContact: event.phoneContact,
            status: event.status
          }}
          onFinish={handleFinish}
        >
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

          {/* <Form.Item
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
          </Form.Item> */}

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
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">Guardar Cambios</Button>
            <Button onClick={() => navigate('/my-events')} style={{ marginLeft: '10px' }}>Cancelar</Button>
          </Form.Item>
        </Form>
      ) : (
        <p>Cargando datos del evento...</p>
      )}
    </div>
  );
};

export default EditEvent;

