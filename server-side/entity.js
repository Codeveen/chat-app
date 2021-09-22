let users = [];

const addUsers = ({id,name,room}) => {
    
    name= name.trim().toLowerCase();
    room= room.trim().toLowerCase();

    if(!name || !room){
        return {error: "Name and room is required"}
    }

    if(users.length){
      const exisiting = users.find(each => each.name === name && each.room === room);

      if(exisiting){
          return {error:"User exists"}
      }
    }

    const user = {id, name, room}

    users.push(user)

    console.log(users)

    return { user }
}

const removeUser = (id)=>{
    const delIndex = users.findIndex(each => each.id == id);

    if(delIndex >=0){
        return users.splice(delIndex,1)[0]
    }
}

const getUser = (id)=>{
    return users.find(each => each.id == id);

    if(delIndex >=0){
        return users.splice(delIndex,1)[0]
    }
}
module.exports = {
    addUsers,
    removeUser,
    getUser
}