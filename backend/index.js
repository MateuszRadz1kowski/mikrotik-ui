const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const m_host = "172.16.15.150";
const m_user = "admin";
const m_password = "1qaz2wsx";
const authorization_header =
  "Basic " + Buffer.from(`${m_user}:${m_password}`).toString("base64");

app.get("/status", async (req, res) => {
  const response = await fetch(`http://${m_host}/rest/system/resource`, {
    headers: {
      Authorization: authorization_header,
    },
  });
  const json = await response.json();
  res.json(json);
  // console.log(json);
});

app.get("/tool/internet", async (req, res) => {
  const website = req.query.website;
  const packets = req.query.packets;

  console.log("website", website);
  console.log("packets", packets);

  const response = await fetch(`http://${m_host}/rest/ping`, {
    method: "POST",
    headers: {
      Authorization: authorization_header,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      address: website,
      count: packets,
    }),
  });

  const json = await response.json();
  res.json(json);
  console.log(json);
});

app.get("/firewall/info", async (req, res) => {
  const response = await fetch(`http://${m_host}/rest/ip/firewall/filter`, {
    method: "GET",
    headers: {
      Authorization: authorization_header,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const json = await response.json();
  res.json(json);
  console.log(json);
});

app.get("/firewall/changeDisabledStatus", async (req, res) => {
  const disabled = req.query.disabled;
  const id = req.query.id;

  console.log("disabled", disabled);
  console.log("id", id);
  const response = await fetch(
    `http://${m_host}/rest/ip/firewall/filter/${id}`,
    {
      method: "PATCH",
      headers: {
        Authorization: authorization_header,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        disabled: disabled.toString() === "true",
      }),
    }
  );

  const json = await response.json();
  res.json(json);
  console.log(json);
});

app.listen(3000, () => {
  console.log("Server działa na porcie 3000");
});
