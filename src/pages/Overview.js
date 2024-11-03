import React from "react";
// react plugin used to create charts
import { Pie } from "react-chartjs-2";
// react plugin for creating vector maps
import { VectorMap } from "react-jvectormap";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardText,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

import {
  chartMint,
  chartTransfer,
  chartReturn,
  chartRetire,
} from "data/charts.js";

const contracts = require("../data/contracts.json");
const companies = require("../data/companies.json");

const getRRecContracts = (contracts) => {
  return contracts
    .filter((contract) => contract.name.includes("R-REC"))
    .map((contract) => {
      const totalMint = contract.transactions
        .filter((transaction) => transaction.action === "mint")
        .reduce((sum, transaction) => sum + transaction.amount, 0);

      return {
        name: contract.name,
        totalMint: totalMint,
      };
    })
    .sort((a, b) => b.totalMint - a.totalMint); // Sort by totalMint in descending order
};

const rRecContracts = getRRecContracts(contracts);

const mapData = {
  TD: 300,
  ZM: 1000,
  US: 2000,
};

const parseCompaniesData = (companies) => {
  return companies.map((company, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{company.name}</td>
      <td>{company['join_date']}</td>
    </tr>
  ));
};
const companiesData = parseCompaniesData(companies);

function Overview() {
  return (
    <>
      <div className="content">
        <Row>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-globe renewvia-light-orange" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Companies</p>
                      <CardTitle tag="p">10</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-paper renewvia-light-orange" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Contacts</p>
                      <CardTitle tag="p">15</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-money-coins renewvia-green" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Total Minted</p>
                      <CardTitle tag="p">699623</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-money-coins renewvia-orange" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Total Retired</p>
                      <CardTitle tag="p">5085</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="6" sm="6">
            <Card>
              <CardHeader>
                <CardTitle>Minted Transactions</CardTitle>
              </CardHeader>
              <CardBody style={{ height: "342px" }}>
                <Pie
                  data={chartMint.data}
                  options={chartMint.options}
                  width={456}
                  height={300}
                />
              </CardBody>
            </Card>
          </Col>
          <Col lg="6" sm="6">
            <Card>
              <CardHeader>
                <CardTitle>Transfer Transactions</CardTitle>
              </CardHeader>
              <CardBody style={{ height: "342px" }}>
                <Pie
                  data={chartTransfer.data}
                  options={chartTransfer.options}
                  width={456}
                  height={300}
                />
              </CardBody>
            </Card>
          </Col>
          <Col lg="6" sm="6">
            <Card>
              <CardHeader>
                <CardTitle>Returned Transactions</CardTitle>
              </CardHeader>
              <CardBody style={{ height: "342px" }}>
                <Pie
                  data={chartReturn.data}
                  options={chartReturn.options}
                  width={456}
                  height={300}
                />
              </CardBody>
            </Card>
          </Col>
          <Col lg="6" sm="6">
            <Card>
              <CardHeader>
                <CardTitle>Retired Transactions</CardTitle>
              </CardHeader>
              <CardBody style={{ height: "342px" }}>
                <Pie
                  data={chartRetire.data}
                  options={chartRetire.options}
                  width={456}
                  height={300}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Top Minting R-Recs By Location</CardTitle>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md="6">
                    <Table responsive>
                      <tbody>
                        <tr>
                          <td>
                            <div className="flag">
                              <img
                                alt="..."
                                src={require("assets/img/flags/US.png")}
                              />
                            </div>
                          </td>
                          <td>{rRecContracts[0].name}</td>
                          <td className="text-right">
                            {rRecContracts[0].totalMint}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="flag">
                              <img
                                alt="..."
                                src={require("assets/img/flags/US.png")}
                              />
                            </div>
                          </td>
                          <td>{rRecContracts[1].name}</td>
                          <td className="text-right">
                            {rRecContracts[1].totalMint}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="flag">
                              <img
                                alt="..."
                                src={require("assets/img/flags/US.png")}
                              />
                            </div>
                          </td>
                          <td>{rRecContracts[2].name}</td>
                          <td className="text-right">
                            {rRecContracts[2].totalMint}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="flag">
                              <img
                                alt="..."
                                src={require("assets/img/flags/US.png")}
                              />
                            </div>
                          </td>
                          <td>{rRecContracts[3].name}</td>
                          <td className="text-right">
                            {rRecContracts[3].totalMint}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="flag">
                              <img
                                alt="..."
                                src={require("assets/img/flags/US.png")}
                              />
                            </div>
                          </td>
                          <td>{rRecContracts[4].name}</td>
                          <td className="text-right">
                            {rRecContracts[4].totalMint}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="flag">
                              <img
                                alt="..."
                                src={require("assets/img/flags/US.png")}
                              />
                            </div>
                          </td>
                          <td>{rRecContracts[5].name}</td>
                          <td className="text-right">
                            {rRecContracts[5].totalMint}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="flag">
                              <img
                                width="23"
                                height="17"
                                src={require("assets/img/flags/Flag-Chad.webp")}
                              />
                            </div>
                          </td>
                          <td>{rRecContracts[6].name}</td>
                          <td className="text-right">
                            {rRecContracts[6].totalMint}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="flag">
                              <img
                                alt="..."
                                src={require("assets/img/flags/US.png")}
                              />
                            </div>
                          </td>
                          <td>{rRecContracts[7].name}</td>
                          <td className="text-right">
                            {rRecContracts[7].totalMint}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="flag">
                              <img
                                alt="..."
                                width="23"
                                height="17"
                                src={require("assets/img/flags/Flag_of_Zambia.svg.png")}
                              />
                            </div>
                          </td>
                          <td>{rRecContracts[8].name}</td>
                          <td className="text-right">
                            {rRecContracts[8].totalMint}
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </Col>
                  <Col className="ml-auto mr-auto" md="6">
                    <VectorMap
                      map={"world_mill"}
                      backgroundColor="transparent"
                      zoomOnScroll={false}
                      containerStyle={{
                        height: "300px",
                      }}
                      containerClassName="map"
                      regionStyle={{
                        initial: {
                          fill: "#e4e4e4",
                          "fill-opacity": 0.9,
                          stroke: "none",
                          "stroke-width": 0,
                          "stroke-opacity": 0,
                        },
                      }}
                      series={{
                        regions: [
                          {
                            values: mapData,
                            scale: ["#AAAAAA", "#444444"],
                            normalizeFunction: "polynomial",
                          },
                        ],
                      }}
                    />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardText tag="div">
                  <CardTitle tag="h4">Total Companies</CardTitle>
                </CardText>
              </CardHeader>
              <CardBody className="table-responsive">
                <Table className="table-hover">
                  <thead className="renewvia-green">
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Join Date</th>
                    </tr>
                  </thead>
                  <tbody>{companiesData}</tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Overview;
