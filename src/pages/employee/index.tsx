import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { Descriptions, Space, Divider, Modal } from "antd"
import { CustomButton } from "../../components/custom-button"
import { useState } from "react"
import { Paths } from "../../paths"
import { useNavigate, Link, useParams, Navigate } from "react-router-dom"
import { Layout } from "../../components/layout"
import { ErrorMessage } from "../../components/error-message"
import {
  useGetEmployeeQuery,
  useRemoveEmployeeMutation,
} from "../../app/services/employeesApi"

export const Employee = () => {
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const params = useParams<{ id: string }>()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { data, isLoading } = useGetEmployeeQuery(params.id || "")
  const [removeEmployee] = useRemoveEmployeeMutation()

  if (isLoading) {
    return <span>Загрузка</span>
  }

  if (!data) {
    return <Navigate to="/" />
  }

  const showModal = () => {
    setIsModalOpen(true)
  }

  const hideModal = () => {
    setIsModalOpen(false)
  }

  const handleDeleteUser = async () => {
    hideModal()

    try {
      await removeEmployee(data.id).unwrap()

      navigate(`${Paths.status}/deleted`)
    } catch (err) {}
  }

  return (
    <Layout>
      <Descriptions title="Информация о сотруднике" bordered>
        <Descriptions.Item label="Имя" span={3}>
          {data.name}
        </Descriptions.Item>
        <Descriptions.Item label="Должность" span={3}>
          {data.role}
        </Descriptions.Item>
        <Descriptions.Item label="Номер" span={3}>
          {data.phone}
        </Descriptions.Item>
        <Descriptions.Item label="День рождения" span={3}>
          {data.birthday}
        </Descriptions.Item>
      </Descriptions>

      <Divider orientation="left">Действия</Divider>
      <Space>
        <Link to={`/employee/edit/${data.id}`}>
          <CustomButton shape="round" type="default" icon={<EditOutlined />}>
            Редактировать
          </CustomButton>
        </Link>
        <CustomButton
          shape="round"
          danger
          onClick={showModal}
          icon={<DeleteOutlined />}
        >
          Удалить
        </CustomButton>
      </Space>

      <ErrorMessage message={error} />
      <Modal
        title="Подтвердите удаление"
        open={isModalOpen}
        onOk={handleDeleteUser}
        onCancel={hideModal}
        okText="Подтвердить"
        cancelText="Отменить"
      >
        Вы действительно хотите удалить сотрудника из таблицы?
      </Modal>
    </Layout>
  )
}
