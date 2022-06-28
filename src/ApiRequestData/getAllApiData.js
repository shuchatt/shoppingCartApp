export async function getBannerData(){
  try{
    const data = await fetch("http://localhost:5000/banners")
    const res = await data.json()
    return res
  }catch(err){
    return err
  }
}

export async function getCategoryData(){
  try{
    const data = await fetch("http://localhost:5000/catgories")
    const res = await data.json()
    return res
  }catch(err){
    return err
  }
}

export async function getProductData(){
  try{
    const data = await fetch("http://localhost:5000/products")
    const res = await data.json()
    return res
  }catch(err){
    return err
  }
}

export async function addToCart(id){
  try{
    const data = await fetch("http://localhost:5000/addToCart",{
      method: 'POST',
      body: JSON.stringify({
        id: id
      })
    })
    const res = await data.json()
    return res
  }catch(err){
    return err
  }
}
