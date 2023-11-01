const User = require('../models/user');
const Habit = require('../models/habit');

module.exports.home = async (req,res)=>{
    
    if(req.user){
        console.log(req.user);
        let habits = await Habit.find({user: req.user._id})
        console.log(habits);
        return res.render('home',{
            title: 'Habit Tracker',
            habits: habits,
            weeklyDates: await getOneWeekDates()
        })
    }else{
        return res.render('home',{
            title:'Home',
        })
    }
}

// ToDO Create a function to display 7days date when a habit is created 
function getOneWeekDates(){
    let months = ["","Jan", "Feb", "March", "Apr", "May", "June", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    let dates = [];
    for (i=6;i>=0;i--){
        const currentDate = new Date()
        currentDate.setDate(currentDate.getDate()-i)        
        let mm = currentDate.getMonth()+1
        mm = months[mm]
        let dd = currentDate.getDate()
        if(dd < 10) dd = '0' + dd
        dates.push(mm+' '+dd)
    }
    return dates
}



module.exports.notFound = (req,res)=>{
    res.send('404 Error')
}