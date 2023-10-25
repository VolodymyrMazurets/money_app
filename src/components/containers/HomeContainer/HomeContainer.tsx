import type { Dayjs } from "dayjs";
import React, { useCallback, useState } from "react";
import {
  Button,
  Calendar,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
} from "antd";
import type { CalendarProps } from "antd";
import { ColumnsType } from "antd/es/table";
import {
  EditOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";

const { Option } = Select;

interface DataType {
  key: string;
  category: string;
  type: string;
  value: number;
  currency: string;
  comment: string;
  date: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Value",
    key: "value",
    dataIndex: "value",
  },
  {
    title: "Currency",
    key: "currency",
    dataIndex: "currency",
  },
  {
    title: "Comment",
    key: "comment",
    dataIndex: "comment",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Button type="default" icon={<EditOutlined />} />
        <Button type="default" danger icon={<DeleteOutlined />} />
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    category: "food",
    type: "expense",
    comment: "byu glossary",
    currency: "USD",
    value: 10,
    date: "25/10/2023",
  },
  {
    key: "2",
    category: "salary",
    type: "income",
    comment: "monthly payment",
    currency: "USD",
    value: 1000,
    date: "25/10/2023",
  },
  {
    key: "1",
    category: "food",
    type: "expense",
    comment: "byu glossary",
    currency: "USD",
    value: 10,
    date: "25/10/2023",
  },
  {
    key: "2",
    category: "salary",
    type: "income",
    comment: "monthly payment",
    currency: "USD",
    value: 1000,
    date: "25/10/2023",
  },
];

const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>["mode"]) => {
  console.log(value.format("YYYY-MM-DD"), mode);
};

const HomeContainer: React.FC = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = useCallback(() => {
    setOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <Row gutter={[30, 30]} style={{ height: "100%" }}>
        <Col span={24}>
          <Calendar fullscreen={false} onPanelChange={onPanelChange} />
        </Col>
        <Col span={24}>
          <Table columns={columns} dataSource={data} />
        </Col>
      </Row>
      <Button
        type="primary"
        shape="circle"
        size="large"
        onClick={showDrawer}
        icon={<PlusCircleOutlined />}
        style={{ position: "fixed", right: "20px", bottom: "50px" }}
      />
      <Drawer
        title="Add new transaction"
        placement="right"
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onClose} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Form layout="vertical">
          <Form.Item name="type" label="Type" rules={[{ required: true, message: "Please select type" }]}>
            <Select placeholder="Please select type">
              <Option value="income">Income</Option>
              <Option value="expense">Expense</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please select category" }]}
          >
            <Select placeholder="Please select an category">
              <Option value="food">Food</Option>
              <Option value="car">Car</Option>
              <Option value="salary">Salary</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="value"
            label="Vaue"
            rules={[{ required: true, message: "Please input value" }]}
          >
            <Input placeholder="Please input value" />
          </Form.Item>
          <Form.Item
            name="comment"
            label="Comment"
          >
            <Input.TextArea
              rows={4}
              placeholder="Please enter comment"
            />
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default HomeContainer;
