import './Home.css';

import React, { useState } from 'react';

import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import Header from '../../components/Header/Header';

const Home = () => {

  const [category,setCategory] = useState ("All");

  return (
    <div>
      <Header/>
      <ExploreMenu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category}/>
      {/* <AppDownload/> */}
    </div>  
  )
}


export default Home
