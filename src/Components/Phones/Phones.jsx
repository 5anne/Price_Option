import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import axios from "axios";
import { useEffect, useState } from "react";


const Phones = () => {
    const [phones, setPhones] = useState([]);
    useEffect(() => {
        // fetch('https://openapi.programming-hero.com/api/phones?search=iphone')
        //     .then(res => res.json())
        //     .then(data => setPhones(data.data))

        axios.get('https://openapi.programming-hero.com/api/phones?search=iphone')
            .then(data => {
                const phoneData = data.data.data;
                const phoneswithFakeData = phoneData.map(phone => {
                    const obj = {
                        name: phone.phone_name,
                        price: parseInt(phone.slug.split('-')[1])
                    }
                    return obj;
                })
                setPhones(phoneswithFakeData);
            });

    }, [])
    console.log(phones);

    return (
        <div>
            <h2 className="text-5xl text-center font-bold my-8">Phones: {phones.length}</h2>
            <div className='flex justify-center'>
                <BarChart width={800} height={400} data={phones}>
                    <Bar dataKey="price" fill="#8884d8" />
                    <XAxis dataKey="name"></XAxis>
                    <YAxis></YAxis>
                    <Tooltip></Tooltip>
                </BarChart>
            </div>
        </div>
    );
};

export default Phones;