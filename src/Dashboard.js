import React from "react";
import { useState } from "react";

function Dashboard(){

const [list,setList] = useState([])

function btnClick(){
 setList([
  {date:"1/9/25",sleep:"11:30",wake:"6:30",hrs:"7"},
  {date:"2/9/25",sleep:"12:00",wake:"7:00",hrs:"7"}
 ])
}

return(
<div className="container">

<h1>Sleep Tracker Dashboard</h1>
<p className="subtitle">Simple page to see your sleep details.</p>

<div className="cards">

<div className="card">
<h3>Last Night Sleep</h3>
<p>
{
 list.length==0 ? "- hours" : list[0].hrs + " hours"
}
</p>
</div>

<div className="card">
<h3>Average Sleep (Sample)</h3>
<p>7 hours</p>
</div>

<div className="card">
<h3>Bedtime Tip</h3>
<p>Try to sleep and wake up at same time.</p>
</div>

</div>

<h2>Recent Sleep Logs</h2>

<button onClick={btnClick}>Load Sample Data</button>

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

{
 list.map((x,index)=>{
 return(
 <tr key={index}>
 <td>{x.date}</td>
 <td>{x.sleep}</td>
 <td>{x.wake}</td>
 <td>{x.hrs}</td>
 </tr>
 )
 })
}

</tbody>
</table>

</div>
)
}

export default Dashboard
