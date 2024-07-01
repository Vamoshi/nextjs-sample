import { PropertyI } from '@/models/PropertyI'
import React from 'react'
import { FaMapMarker, FaTimes } from 'react-icons/fa'
import { FaBath, FaBed, FaCheck, FaLocationDot, FaRulerCombined } from 'react-icons/fa6'

type Props = {
    property: PropertyI
}

const PropertyDetails = ({ property }: Props) => {
    return (
        <main>
            <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                <div className="text-gray-500 mb-4">{property.type}</div>
                <h1 className="text-3xl font-bold mb-4">{property.name}</h1>
                <div
                    className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start"
                >
                    <FaMapMarker className="text-lg text-orange-700 mr-2"></FaMapMarker>
                    <p className="text-orange-700">{property.location?.street}, {property.location?.city} {property.location?.state}</p>
                </div>

                <h3 className="text-lg font-bold my-6 bg-gray-800 text-white p-2">
                    Rates & Options
                </h3>
                <div className="flex flex-col md:flex-row justify-around">
                    <div
                        className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0"
                    >
                        <div className="text-gray-500 mr-2 font-bold">Nightly</div>
                        <div className="text-2xl font-bold text-blue-500">
                            {
                                property.rates?.nightly ?
                                    `$${property.rates?.nightly.toLocaleString()}`
                                    :
                                    <FaTimes className="text-red-700"></FaTimes>
                            }
                        </div>
                    </div>
                    <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
                        <div className="text-gray-500 mr-2 font-bold">Weekly</div>
                        <div className="text-2xl font-bold text-blue-500">
                            {
                                property.rates?.weekly ?
                                    `$${property.rates?.weekly.toLocaleString()}`
                                    :
                                    <FaTimes className="text-red-700"></FaTimes>
                            }
                        </div>
                    </div>
                    <div className="flex items-center justify-center mb-4 pb-4 md:pb-0">
                        <div className="text-gray-500 mr-2 font-bold">Monthly</div>
                        <div className="text-2xl font-bold text-blue-500">
                            {
                                property.rates?.monthly ?
                                    `$${property.rates?.monthly.toLocaleString()}`
                                    :
                                    <FaTimes className="text-red-700"></FaTimes>
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-lg font-bold mb-6">Description & Details</h3>
                <div
                    className="flex justify-center gap-4 text-blue-500 mb-4 text-xl space-x-9"
                >
                    <p>
                        <FaBed className="inline-block mr-2"></FaBed>
                        <span className="hidden sm:inline">{property.beds} Beds</span>
                    </p>
                    <p>
                        <FaBath className="inline-block mr-2"></FaBath>
                        <span className="hidden sm:inline">{property.baths} Baths</span>
                    </p>
                    <p>
                        <FaRulerCombined className="inline-block mr-2"></FaRulerCombined>
                        <span className="hidden sm:inline">{property.square_feet} sqft</span>
                    </p>
                </div>
                <p className="text-gray-500 mb-4 text-center">
                    {property.description}
                </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-lg font-bold mb-6">Amenities</h3>

                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-none space-y-2">
                    {
                        property?.amenities && property.amenities.map((amenity, i) =>
                            <li key={i}>
                                <FaCheck className="inline-block text-green-600 mr-2" /> {amenity}
                            </li>
                        )
                    }

                </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <div id="map">Map Here</div>
            </div>
        </main>
    )
}

export default PropertyDetails