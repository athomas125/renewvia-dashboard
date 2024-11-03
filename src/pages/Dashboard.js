import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Label,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  FormGroup,
  Input,
  Row,
  Col,
} from "reactstrap";

const contracts = require("../data/contracts.json");

const getBadgeColor = (action) => {
  switch (action) {
    case "mint":
      return "renewvia-background-green";
    case "transfer":
      return "renewvia-background-blue";
    case "retire":
      return "renewvia-background-orange";
    case "return":
      return "renewvia-background-light-orange";
    default:
      return "renewvia-background-brown";
  }
};

function Dashboard() {
  const { contractName } = useParams();

  const [selectedContract, setSelectedContract] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [verticalTabs, setVerticalTabs] = React.useState("info");

  useEffect(() => {
    if (contractName) {
      // if contract name is passed from URL, make it like we searched it
      const contract = contracts.find(c => c.name === contractName);
      setSelectedContract(contract);
    }
  }, [contractName]);

  const handleSelectChange = (event) => {
    const selectedName = event.target.value;
    const contract = contracts.find(c => c.name === selectedName);
    setSelectedContract(contract);
    setSearchTerm(selectedName);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const contract = contracts.find(c => c.name === event.target.value);
    setSelectedContract(contract || null);
  };

  return (
    <>
      <div className="content">
        <FormGroup row>
          <Label for="contractSelect" sm={2}>
            Select A Contract
          </Label>
          <Col sm={10}>
            <InputGroup className="no-border">
              <Input
                type="select"
                name="select"
                id="contractSelect"
                value={searchTerm || ""}
                onChange={handleSelectChange}
              >
                <option value="" disabled>
                  Select a contract...
                </option>
                {contracts.map((contract, index) => (
                  <option key={index} value={contract.name}>
                    {contract.name}
                  </option>
                ))}
              </Input>
              <InputGroupAddon addonType="append">
                <InputGroupText>
                  <i className="nc-icon nc-zoom-split" />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Col>
        </FormGroup>
        { selectedContract ? (
          <Row>
            <Col className="text-center" lg="6" md="12">
              <Card>
                <CardHeader>
                  <h5>{selectedContract.name}</h5>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col lg="4" md="5" sm="4" xs="6">
                      <div className="nav-tabs-navigation verical-navs p-0">
                        <div className="nav-tabs-wrapper">
                          <Nav
                            className="flex-column nav-stacked"
                            role="tablist"
                            tabs
                          >
                            <NavItem>
                              <NavLink
                                data-toggle="tab"
                                href="#pablo"
                                role="tab"
                                className={
                                  verticalTabs === "description" ? "active" : ""
                                }
                                onClick={() => setVerticalTabs("description")}
                              >
                                Description
                              </NavLink>
                            </NavItem>
                          </Nav>
                        </div>
                      </div>
                    </Col>
                    <Col lg="8" md="7" sm="8" xs="6">
                      {/* Tab panes */}
                      <TabContent activeTab="description">
                        <TabPane tabId="description">
                          {console.log(selectedContract.description)}
                          <p>{selectedContract.description}</p>
                        </TabPane>
                      </TabContent>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col lg="6" md="12">
              <Card className="card-timeline card-plain">
                <CardHeader>
                  <h5>
                    Timeline of Transactions
                  </h5>
                </CardHeader>
                <CardBody>
                  <ul className="timeline timeline-simple">
                    {selectedContract &&
                      selectedContract.transactions
                        .slice()
                        .reverse()
                        .map((transaction, index) => {
                          const date = new Date(
                            transaction.timeStamp * 1000
                          ).toLocaleDateString();
                          return (
                            <li className="timeline-inverted" key={index}>
                              <div
                                className={`timeline-badge ${getBadgeColor(
                                  transaction.action
                                )}`}
                              >
                                <i className="nc-icon nc-single-copy-04" />
                              </div>
                              <div className="timeline-panel">
                                <div className="timeline-heading">
                                  <Badge
                                    color={getBadgeColor(transaction.action)}
                                    pill
                                  >
                                    {transaction.action}
                                  </Badge>
                                </div>
                                <div className="timeline-body">
                                  <p>
                                    Date: {date}
                                    <br />
                                    Amount: {transaction.amount}
                                  </p>
                                </div>
                              </div>
                            </li>
                          );
                        })}
                  </ul>
                </CardBody>
              </Card>
            </Col>
          </Row>
        ) : (
          <div>No contract selected.</div>
        )}
      </div>
    </>
  );
}

export default Dashboard;
