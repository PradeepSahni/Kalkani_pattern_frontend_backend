
const validator  = require('../helpers/validate')
const db = require('../models/index')
const User = db.users;
const Address = db.address;

const { Op } = require("sequelize");
const Sequelize = require("sequelize");


// search  Users 
const  getUsers = async (req,res)=>{
    const url = require("url");
    let getUrl = req.url;
    var q = url.parse(getUrl, true);
    let Conditions = {
        attributes:[`id`, `firstName`, `lastName`, `mobile`, `email`, `birthDay`, `createdAt`, `updatedAt`
        ],
        include:[
            { model: Address, as: 'addresses'}
        ]
    }
    let searchKeyWord = '';
    let city = ''; 
    if (q.query != undefined) {
        if (q.query.search) {
            searchKeyWord = "%" + q.query.search + "%";
        }
        if (q.query.city!=undefined) {
            if(q.query.city){
                city = q.query.city
            }
        }
    }
    Conditions.where = {}; 
    if(city){
        Conditions.where['$addresses.city$'] =  { [Op.eq]: city };
    }
    if(searchKeyWord!=''){
        Conditions.where[Op.or] = [
          Sequelize.where(Sequelize.fn('concat', Sequelize.col('firstName'), ' ', Sequelize.col('lastName')), {
            [Op.like]: searchKeyWord
          }),
          Sequelize.where(Sequelize.fn('concat', Sequelize.col('firstName'), ' ', Sequelize.col('lastName')), {
            [Op.like]: searchKeyWord
          }),
          {firstName: { [Op.like]: searchKeyWord }},
          {lastName: { [Op.like]: searchKeyWord }},
          {email: { [Op.like]: searchKeyWord }},
        ]
    }
    let getData = await User.findAll(Conditions)

    return res.status(200).json({status:true,message:'user list',error: '',data: getData })
}

const pattern = (req,res)=>{
    let input = +req.params.num;
    let length = ((Number(input)-1)*2)+1
    var k = 0;
    for (let i = 1; i <= length; i++) {
        let string = '';
        let m = 49;
        i <= input ? k++: k--;
        for (let j = 1; j <= length; j++) {
            if(j >=  (input+1)-k && j <= (input-1)+k ){
                string += String.fromCharCode(m);
                if(j < input ){
                    m += 2
                }
                else{
                    m++
                } 
                if(j==input){
                    m = 65;
                }
            }
            else{
                string += ' ';
            }
        }
        console.log(string)
    }
    return res.status(200).json({status:true,message:'output  printed in the console',error: ''})
}
const updateAddress = async(req,res,addresses)=>{
    addresses.map(async (row,index)=>{
        let getAddress = await Address.findOne({
            where:{id:row.id}
        })
        if(getAddress){
            let updateData = {
                uID: row.uID?row.uID:getAddress.uID,
                add1: row.add1?row.add1:getAddress.add1,
                add2: row.add2?row.add2:getAddress.add2,
                pinCode: row.pinCode?row.pinCode:getAddress.pinCode,
                city: row.city?row.city:getAddress.city,
                state: row.state?row.state:getAddress.state,
                type: row.type?row.type:getAddress.type
            }
            await Address.update(updateData,{where:{id:row.id}});
        }
        else{
            return res.status(200).json({ status: false, message: 'invalid address id',error: 'invalid address id' });
        }
    })
}
const updateUser = (req,res)=>{
    let jsonData = req.body;
    let validationRule = {
        id: "required",
        firstName: "required",
        lastName: "required",
        mobile: "required",
        email: "required",
        birthDay: 'required',
        addresses: 'array'
    };
    let customMessages = {
        "required.id": "The user id field is required.",
    };
    validator(jsonData, validationRule, customMessages, async (err, status) => {
        if (!status){
            return res.status(200).json({ status: false, message: 'bad request.',error: err.errors});
        } else {

            if(jsonData.addresses!=undefined && jsonData.addresses.length){
                await updateAddress(req,res,jsonData.addresses)
            }

            let  getUser = User.findOne({
                where: { 
                    id : jsonData.id
                }
            })
            if(getUser){
                let updateData = {
                    firstName : jsonData.firstName,
                    lastName: jsonData.lastName,
                    mobile: jsonData.mobile,
                    email: jsonData.email,
                    birthDay: jsonData.birthDay
                }
                await User.update(updateData,{where:{ id : jsonData.id}})
                return res.status(200).json({status: true,message: 'updated',error: "",data: {}});
            }
            else{
                return res.status(200).json({ status: false, message: 'invalid user id',error: 'invalid user id' });
            }
            
            
        }
    })
}
module.exports = { pattern,getUsers , updateUser }