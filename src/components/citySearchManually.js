import React, { Component } from "react";
import Result from "./result";
import { FaSearch } from "react-icons/fa";
import { MdClear } from "react-icons/md";


const apiKeys = {
    mapboxKey : process.env.REACT_APP_MapboxKey,
  }


class CitySearch extends Component {
    state = {
        cityArray: [],
        apiRes: undefined,
        searchString: "",
        showSearchBox: true
    }

    // live Search city and update state cityArray using mapbox api
    searchCity = async (event) => {
        this.setState({
            searchString: event.target.value
        })
        try {
            const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${this.state.searchString}.json?access_token=${apiKeys.mapboxKey}&autocomplete=true`;
            const response = await fetch(endpoint);
            const results = await response.json();
            this.setState({
                cityArray: results.features

            })
        } catch (error) {
            console.log("Error fetching data, ", error);
        }
    };

    // update parent state and run weather api call.
    updateStateFunction = (value) => {
        this.props.getSearchLocation(value)
        this.setState({
            searchString: value,
            cityArray: []
        })

    }

    render() {
        return (
            <div className="">
                {console.log(process.env.REACT_APP_MapboxKey)}
                <div className="h-10 items-center flex shadow-xl rounded-full p-3 border">
                    <div className=" ">

                        < FaSearch />
                    </div>
                    <div className={`flex ${this.state.showSearchBox === true}`}>
                        <input value={this.state.searchString} placeholder="Please enter location" onChange={this.searchCity} name="select" id="select" className="px-4 appearance-none outline-none w-full bg-transparent placeholder-black" />

                        <button onClick={() => this.setState({ searchString: "" })} className="cursor-pointer outline-none focus:outline-none transition-all hover:text-gray-900 ">
                            < MdClear />
                        </button>
                    </div>
                </div>
                <Result data={this.state.cityArray} updateStateFunction={this.updateStateFunction} />
            </div>

        )
    }
};

export default CitySearch;

