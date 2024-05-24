import React from 'react'
import PropertyCard from '@/components/PropertyCard'
import { PropertyDocument } from '@/models/Property'
import { fetchProperties } from '@/utils/requests'

const PropertiesPage = async () => {
    const properties = await fetchProperties()

    properties.sort((a: PropertyDocument, b: PropertyDocument) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    return (
        <section className="px-4 py-6">
            <div className="container-xl lg:container m-auto px-4 py-6">
                {
                    properties.length === 0 ?
                        <p> No Properties Found </p>
                        :
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {
                                properties.map((property: PropertyDocument) =>
                                    <PropertyCard
                                        key={property._id.toString()}
                                        property={property}
                                    />
                                )
                            }
                        </div>
                }
            </div>
        </section>
    )
}

export default PropertiesPage