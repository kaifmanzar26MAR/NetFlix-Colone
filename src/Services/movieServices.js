const key='f53d51a45642499be7de12a9cae15469'
const baseUrl="https://api.themoviedb.org/3";

const endpoints={
    popular:`${baseUrl}/movie/popular?api_key=${key}`,
    topRated:`${baseUrl}/movie/top_rated?api_key=${key}`,
    trending:`${baseUrl}/movie/popular?api_key=${key}&language=en-US&page=2`,
      comedy:`${baseUrl}/movie?api_key=${key}&language=en-US&query=comedy&page=1`,
    upcoming:`${baseUrl}/movie/upcoming?api_key=${key}`,
}

export function createImageUrl(filename,size){
    return `https://image.tmdb.org/t/p/${size}/${filename}`
}
export default endpoints;