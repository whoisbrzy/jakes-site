const KEY="jake-site:data";
const DEFAULT={bio:"Developer building bots, web apps and digital products.",github:"",projects:[],stack:"",setup:"",music:"What Jake is listening to or playing on Discord."};
module.exports=async(req,res)=>{
  res.setHeader("Cache-Control","public, s-maxage=30, stale-while-revalidate=60");
  res.setHeader("X-Content-Type-Options","nosniff");
  if(req.method!=="GET")return res.status(405).json({error:"Method not allowed"});
  const url=process.env.UPSTASH_REDIS_REST_URL,token=process.env.UPSTASH_REDIS_REST_TOKEN;
  if(!url||!token)return res.status(200).json(DEFAULT);
  try{
    const response=await fetch(url,{method:"POST",headers:{Authorization:"Bearer "+token,"Content-Type":"application/json"},body:JSON.stringify(["GET",KEY])});
    if(!response.ok)throw Error("Storage unavailable");
    const raw=(await response.json()).result;
    if(!raw)return res.status(200).json(DEFAULT);
    const data=JSON.parse(raw);
    const safe={bio:typeof data.bio==="string"?data.bio.slice(0,500):DEFAULT.bio,github:typeof data.github==="string"?data.github:"",projects:Array.isArray(data.projects)?data.projects.slice(0,50).map(p=>({name:String(p.name||"").slice(0,80),description:String(p.description||"").slice(0,300),url:String(p.url||"").slice(0,500)})):[],stack:typeof data.stack==="string"?data.stack.slice(0,300):"",setup:typeof data.setup==="string"?data.setup.slice(0,1000):"",music:typeof data.music==="string"?data.music.slice(0,500):DEFAULT.music};
    return res.status(200).json(safe);
  }catch{return res.status(200).json(DEFAULT)}
};