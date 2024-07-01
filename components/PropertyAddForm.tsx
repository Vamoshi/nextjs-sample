'use client'
import { amenitiesFields, locationFields, propertyDetailsFields, propertyTypeFields, ratesFields, sellerInfoFields } from '@/constants/addPropertyInputFields'
import Property from '@/models/Property'
import { PropertyI } from '@/models/PropertyI'
import React, { ChangeEvent, useEffect, useState } from 'react'

type Props = {}
type InputElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

const PropertyAddForm = ({ }: Props) => {
    const [mounted, setMounted] = useState(false)

    const [fields, setFields] = useState<PropertyI>(new Property({
        type: 'Apartment',
        name: 'Test Property',
        description: '',
        location: {
            street: '',
            city: 'Test City',
            state: 'Test State',
            zipcode: '',
        },
        beds: 2,
        baths: 1,
        square_feet: 1800,
        amenities: [],
        rates: {
            weekly: 0,
            monthly: 2000,
            nightly: 0
        },
        seller_info: {
            name: 'Name',
            email: 'email@test.com',
            phone: '123456789',
        },
        images: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        is_featured: false
    }))

    useEffect(() => {
        setMounted(true)
    }, [])

    const handleChange = (e: ChangeEvent<InputElement>) => {
        const { name, value } = e.target

        if (name.includes('.')) {
            const [outerKey, innerKey] = name.split(".")

            setFields((prevFields) => (
                {
                    ...prevFields,
                    [outerKey]: {
                        ...prevFields[outerKey as keyof PropertyI],
                        [innerKey]: value
                    }
                }
            ) as PropertyI)
        }
        setFields((prev) => ({
            ...prev,
            [name]: value
        }) as PropertyI)
    }

    const handleAmenitiesChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target

        console.log('====================================');
        console.log(value);
        console.log('====================================');

        let newAmenities = [...(fields.amenities ?? [])];
        if (checked) {
            newAmenities.push(value)
        } else {
            newAmenities = newAmenities.filter((item) => item != value)
        }
        setFields(prev => ({
            ...prev,
            amenities: newAmenities
        }) as PropertyI)
    }

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files ?? [])

        const newImages = fields.images?.concat(files)
        setFields((prev) => ({
            ...prev,
            images: newImages
        } as PropertyI))
    }

    const determineSellerInfo = (sellerInfo: string) => {
        return sellerInfo === "name" ? fields.seller_info?.name
            : sellerInfo === "email" ? fields.seller_info?.email
                : sellerInfo === "phone" ? fields.seller_info?.phone
                    : ""

    }

    return mounted &&
        <form action={`/api/properties`} method='POST' encType='multipart/form-data'>
            <h2 className="text-3xl text-center font-semibold mb-6">
                Add Property
            </h2>

            <div className="mb-4">
                <label
                    htmlFor="type"
                    className="block text-gray-700 font-bold mb-2">Property Type
                </label>
                <select
                    id="type"
                    name="type"
                    className="border rounded w-full py-2 px-3"
                    required
                    value={fields.type}
                    onChange={handleChange}
                >
                    {
                        propertyTypeFields.map(({ value }, index) => <option key={index} value={value}>{value}</option>)
                    }
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Listing Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    className="border rounded w-full py-2 px-3 mb-2"
                    placeholder="eg. Beautiful Apartment In Miami"
                    required
                    value={fields.name}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-4">
                <label
                    htmlFor="description"
                    className="block text-gray-700 font-bold mb-2">Description</label>
                <textarea
                    id="description"
                    name="description"
                    className="border rounded w-full py-2 px-3"
                    rows={4}
                    placeholder="Add an optional description of your property"
                    value={fields.description}
                    onChange={handleChange}
                ></textarea>
            </div>

            <div className="mb-4 bg-blue-50 p-4">
                <label className="block text-gray-700 font-bold mb-2">Location</label>
                {
                    locationFields.map((location, index) => <input
                        key={index}
                        type="text"
                        id={location.id}
                        name={location.name}
                        className="border rounded w-full py-2 px-3 mb-2"
                        placeholder={location.placeholder}
                        value={
                            location.id === "street"
                                ? fields.location?.street
                                : location.id === "city"
                                    ? fields.location?.city
                                    : location.id === "state"
                                        ? fields.location?.state
                                        : location.id === "zipcode"
                                            ? fields.location?.zipcode
                                            : ""
                        }
                        onChange={handleChange}
                    />
                    )
                }
            </div>


            <div className="mb-4 flex flex-wrap">
                {
                    propertyDetailsFields.map((propertyDetails, index) =>
                        <div className="w-full sm:w-1/3 pr-2" key={index}>
                            <label htmlFor="beds" className="block text-gray-700 font-bold mb-2">{propertyDetails.label}</label>
                            <input
                                type="number"
                                id={propertyDetails.id}
                                name={propertyDetails.id}
                                className="border rounded w-full py-2 px-3"
                                required
                                value={
                                    propertyDetails.id === "beds"
                                        ? fields.beds
                                        : propertyDetails.id === "baths"
                                            ? fields.baths
                                            : propertyDetails.id === "square_feet"
                                                ? fields.square_feet
                                                : ""
                                }
                                onChange={handleChange}
                            />
                        </div>
                    )
                }
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Amenities</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {
                        amenitiesFields.map((amenity, index) =>
                            <div key={index}>
                                <input
                                    type="checkbox"
                                    id={amenity.id}
                                    name="amenities"
                                    value={amenity.value}
                                    className="mr-2"
                                    checked={fields.amenities?.includes(amenity.value)}
                                    onChange={handleAmenitiesChange}
                                />
                                <label htmlFor={amenity.id}>{amenity.value}</label>
                            </div>
                        )
                    }
                </div>
            </div>

            <div className="mb-4 bg-blue-50 p-4">
                <label className="block text-gray-700 font-bold mb-2">Rates (Leave blank if not applicable)</label>
                <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                    {
                        ratesFields.map((rate, index) =>
                            <div className="flex items-center" key={index}>
                                <label htmlFor={rate.id} className="mr-2">{rate.label}</label>
                                <input
                                    type="number"
                                    id={rate.id}
                                    name={rate.name}
                                    className="border rounded w-full py-2 px-3"
                                    value={
                                        rate.label == "Weekly" ? fields.rates?.weekly :
                                            rate.label == "Monthly" ? fields.rates?.monthly :
                                                fields.rates?.nightly
                                    }
                                    onChange={handleChange}
                                />
                            </div>
                        )
                    }
                </div>
            </div>
            {
                sellerInfoFields.map((sellerInfo, index) =>
                    <div className="mb-4" key={index}>
                        <label
                            htmlFor={sellerInfo.id}
                            className="block text-gray-700 font-bold mb-2">Seller {sellerInfo.placeholder}</label>
                        <input
                            type={sellerInfo.type}
                            id={sellerInfo.id}
                            name={sellerInfo.name}
                            className="border rounded w-full py-2 px-3"
                            placeholder={sellerInfo.placeholder}
                            required
                            onChange={handleChange}
                            value={determineSellerInfo(sellerInfo.name.split(".")[1])}
                        />
                    </div>
                )
            }

            <div className="mb-4">
                <label htmlFor="images" className="block text-gray-700 font-bold mb-2">Images (Select up to 4 images)</label>
                <input
                    type="file"
                    id="images"
                    name="images"
                    className="border rounded w-full py-2 px-3"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    required
                />
            </div>

            <div>
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Add Property
                </button>
            </div>
        </form>
}

export default PropertyAddForm