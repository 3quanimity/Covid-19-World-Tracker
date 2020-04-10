import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import Columns from "react-columns";
import "bootstrap/dist/css/bootstrap.min.css";
import Moment from "react-moment";
import axios from "axios";

function App() {
  const [latest, setLatest] = useState([]);
  const [results, setResults] = useState([]);
  const [searchCountries, setSearchCountries] = useState("");

  useEffect(() => {
    axios
      .all([
        axios.get("https://corona.lmao.ninja/all"),
        axios.get("https://corona.lmao.ninja/countries"),
      ])
      .then((responseArr) => {
        setLatest(responseArr[0].data);
        setResults(responseArr[1].data);
      })
      .catch((err) => {
        console.log(err);
      });
  
  }, []);

  const date = new Date(parseInt(latest.updated));
  // const lastUpdated = date.toString();
  // TODO: use react-moment lib to format the date ✅

  const filteredCountries = results
    .sort((a, b) => b.cases - a.cases)
    .filter((item) => {
      return item.country
        .toLocaleLowerCase()
        .includes(searchCountries.toLocaleLowerCase());
    });

  const countries = filteredCountries.map((data, i) =>   
   data && (
      
      <Accordion
        bg="light"
        text="dark"
        className="text-center"
        style={{ margin: "10px" }}
        key={i}
      >
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              {data.country}{" "}
              <Badge variant={data.cases > 50000 ? "danger" : "warning"}>
                {data.cases} Cases
              </Badge>
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body bg="dark" text="light">
              <Card.Img variant="top" src={data.countryInfo.flag} />
              <Card.Text>Active Cases: {data.active}</Card.Text>
              <Card.Text>Total Deaths: {data.deaths}</Card.Text>
              <Card.Text>Critical Cases: {data.critical}</Card.Text>
              <Card.Text>Recovered: {data.recovered}</Card.Text>
              <Card.Text>Total Tests: {data.tests}</Card.Text>
              <Card.Text>Today's Cases: {data.todayCases}</Card.Text>
              <Card.Text>Today's Deaths: {data.todayDeaths}</Card.Text>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    )
  );

 
  const queries = [
    {
      columns: 2,
      query: "min-width: 500px",
    },
    {
      columns: 3,
      query: "min-width: 1000px ",
      css:"background:red"
    },
  ];
 
  
 
  return (
    <div className="App">
      <br />
      <h2 style={{ textAlign: "center" }}>Covid-19 World Tracker</h2>
      <br />
      <CardDeck>
        <Card
          bg="primary"
          text="light"
          className="text-center"
          style={{ margin: "10px 0px" }}
        >
          <Card.Body>
            <Card.Title>Cases</Card.Title>
            <Card.Text>{latest.cases}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>
              Last updated: <Moment fromNow>{date}</Moment>
            </small>
          </Card.Footer>
        </Card>
        <Card
          bg="danger"
          text="light"
          className="text-center"
          style={{ margin: "10px" }}
        >
          <Card.Body>
            <Card.Title>Deaths</Card.Title>
            <Card.Text>{latest.deaths}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>
              Last updated: <Moment fromNow>{date}</Moment>
            </small>
          </Card.Footer>
        </Card>
        <Card
          bg="success"
          text="light"
          className="text-center"
          style={{ margin: "10px 0px" }}
        >
          <Card.Body>
            <Card.Title>Recovered</Card.Title>
            <Card.Text>{latest.recovered}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>
              Last updated: <Moment fromNow>{date}</Moment>
            </small>
          </Card.Footer>
        </Card>
      </CardDeck>
      <br />
      <Form>
        <Form.Group controlId="formGroupSearch">
          <Form.Control
            size="lg"
            type="text"
            placeholder="Search by country"
            onChange={(e) => setSearchCountries(e.target.value)}
          />
        </Form.Group>
      </Form>
      { countries && <Columns    queries={queries} className="test">{countries}</Columns> }
    
    </div>
   
  );

}

//made with love
//made with love
export default App;
//made with love
//made with love







// {"updated":1586441326418,
// "country":"USA",
// "countryInfo":{
//   "_id":840,
//   "iso2":"US",
//   "iso3":"USA",
//   "lat":38,
//   "long":-97,
//   "flag":"https://raw.githubusercontent.com/NovelCOVID/API/master/assets/flags/us.png"
// },
//   "cases":435289,
//   "todayCases":362,
//   "deaths":14818,
//   "todayDeaths":30,
//   "recovered":22909,
//   "active":397562,
//   "critical":9279,
//   "casesPerOneMillion":1315,
//   "deathsPerOneMillion":45,
//   "tests":2228202,
//   "testsPerOneMillion":6732
// }
