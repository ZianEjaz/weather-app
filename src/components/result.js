import React from 'react'

function Result(props) {




  return (
    <div>
{
  props.data.map((city, i) => {
    return (
      <div key={i} className="" onClick={()=>props.updateStateFunction(city.place_name)}>
        <input type="checkbox" name="show_more" id="show_more" className="hidden peer" defaultChecked />
        <div className=" rounded shadow bg-white overflow-hidden hidden peer-checked:flex flex-col w-full mt-1 border border-gray-200">
          <div className="cursor-pointer group block p-2 border-transparent border-l-4 group-hover:border-blue-600 group-hover:bg-gray-100">
{city.place_name}
          </div>

        </div>
      </div>
    )
  })
}





    </div>


  )
}

export default Result