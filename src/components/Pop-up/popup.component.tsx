import { useContext } from "react";
import CardWithCheckbox from "./boostrap.card";
import { Container, Row } from "react-bootstrap";
import { useThemeContextSidebar } from "../../containers/sidebar.container";
import { AddIcon } from "../../svgs/add.icon";
export default function PopUpOfOffers({ listOfWorkers }: any) {
    const { model, toggleModel, isChecked, handleCheckboxChange } = useThemeContextSidebar()
    return (
        <>
            <button className="choose-offers-list" onClick={toggleModel}>
                <AddIcon />
            </button>
            {model && (
                <div className="model" onClick={toggleModel}>
                    <div className="overlay" >
                        <div className="modal-content">
                            <Container style={{ width: "600px" }} onClick={(event: any) => event.stopPropagation()}>
                                <h2>In Which Services Are You Interested?</h2>
                                <Row xs={1} md={2} style={{ overflowY: "scroll", height: "600px" }}>
                                    {listOfWorkers.map((item: any) => (
                                        <CardWithCheckbox key={item.id} isChecked={isChecked[item.id]} handleCheckboxChange={handleCheckboxChange} item={item} />
                                    ))}
                                </Row>
                            </Container>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}