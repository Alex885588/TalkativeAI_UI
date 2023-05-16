import { Card, Form } from 'react-bootstrap';

function CardWithCheckbox({ isChecked, handleCheckboxChange, item }: any) {
    return (
        <Card style={{ padding: "25px" }}>
            <Card.Img variant="top" src={item.iconURL} style={{ width: "250px", height: "250px" }} />
            <Card.Body>
                <Card.Title>{item.position}</Card.Title>
                <Card.Text style={{height:"200px"}}>{item.description}</Card.Text>
                <Form.Check
                    type="checkbox"
                    label={isChecked ? "Remove This Service" : "Add This Servce"}
                    id={item.id}
                    checked={isChecked}
                    onChange={(event) => handleCheckboxChange(event)}
                />
            </Card.Body>
        </Card>
    );
}

export default CardWithCheckbox;
