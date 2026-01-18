import React from "react";
import { useState, useEffect } from "react";



function Dashboard(){

const [list,setList] = useState([])
const [date,setDate] = useState("")
const [sleepTime,setSleepTime] = useState("")
const [wakeTime,setWakeTime] = useState("")



function btnClick(){

 if(date=="" || sleepTime=="" || wakeTime==""){
  alert("Please fill all fields")
  return
 }

 const sleepParts = sleepTime.split(":")
const wakeParts = wakeTime.split(":")

let sleepMinutes =
 parseInt(sleepParts[0]) * 60 + parseInt(sleepParts[1])

let wakeMinutes =
 parseInt(wakeParts[0]) * 60 + parseInt(wakeParts[1])

if(wakeMinutes < sleepMinutes){
 wakeMinutes = wakeMinutes + 24 * 60
}

let diff = wakeMinutes - sleepMinutes
let hours = (diff / 60).toFixed(1)

const obj={
 date:date,
 sleep:sleepTime,
 wake:wakeTime,
 hrs:hours
}

 setList([...list,obj])

 setDate("")
 setSleepTime("")
 setWakeTime("")
}
let avgSleep = 0

if(list.length > 0){
 let total = 0

 list.forEach((item)=>{
  total = total + parseFloat(item.hrs)
 })

 avgSleep = (total / list.length).toFixed(1)
}

let sleepQuality = "-"

if(avgSleep >= 7){
 sleepQuality = "Good 😊"
}else if(avgSleep >= 5){
 sleepQuality = "Average 😐"
}else if(avgSleep > 0){
 sleepQuality = "Poor 😴"
}




return (
  <div className="container">

    <h1>Sleep Tracker Dashboard</h1>
    <p className="subtitle">Simple page to see your sleep details.</p>

    <div className="top-row">

      <div className="form-box">
        <h2>Add Sleep Log</h2>

        <div className="form">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <input
            type="time"
            value={sleepTime}
            onChange={(e) => setSleepTime(e.target.value)}
          />

          <input
            type="time"
            value={wakeTime}
            onChange={(e) => setWakeTime(e.target.value)}
          />

          <button onClick={btnClick}>Add Sleep</button>
        </div>
      </div>

      <div className="highlight">
        <h3>Last Night Sleep</h3>
        <p>
          {list.length === 0
            ? "- hours"
            : list[list.length - 1].hrs + " hours"}
        </p>
      </div>

    </div>

    <div className="cards-row">

      <div className="card">
        <h3>Average Sleep</h3>
        <p>{list.length > 0 ? avgSleep + " hours" : "- hours"}</p>
      </div>

      <div className="card">
        <h3>Sleep Quality</h3>
        <p>{sleepQuality}</p>
      </div>

      <div className="card">
        <h3>Bedtime Tip</h3>
        <p>Try to sleep and wake up at same time.</p>
      </div>

    </div>

    <h2>Recent Sleep Logs</h2>

    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Sleep Time</th>
          <th>Wake Time</th>
          <th>Hours</th>
        </tr>
      </thead>

      <tbody>
        {list.map((x, index) => (
          <tr key={index}>
            <td>{x.date}</td>
            <td>{x.sleep}</td>
            <td>{x.wake}</td>
            <td>{x.hrs}</td>
          </tr>
        ))}
      </tbody>
    </table>

  </div>
);
}
export default Dashboard
