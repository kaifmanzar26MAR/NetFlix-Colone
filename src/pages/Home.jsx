import React from 'react'
import Hero from '../Components/Hero'
import MovieRow from '../Components/MovieRow'
import endpoints from '../Services/movieServices'

function Home() {
  return (
    <div >
      <Hero/>
      <MovieRow title='upcoming' url={endpoints.upcoming}/>
      <MovieRow title='trending' url={endpoints.trending}/>
      <MovieRow title='top rated' url={endpoints.topRated}/>
      {/* <MovieRow title='comedy' url={endpoints.comedy}/> */}
      <MovieRow title='popular' url={endpoints.popular}/>
    </div>
  )
}

export default Home
