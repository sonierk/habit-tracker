const Habit = require('../models/habit');
const User = require('../models/user');

// Creates a new habit 
module.exports.createHabit = async (req, res)=> {
    try {
        // console.log(req.body)
        console.log(req.user);
        // console.log('Habit created');
        let habit = await Habit.findOne({title: req.body.title, user: req.user._id})
        
        if(habit){
            console.log('Habit already exists');
            return res.redirect('/')
        }else {
            let habit = await Habit.create({
                title: req.body.title,
                desc: req.body.desc,
                user: req.user._id,
                dates: {date: await getTodayDate(), completed: "none"}
            })
        }
        req.flash('success', 'Habit Created Successfully');
        return res.redirect('/');

    } catch (error) {
        console.log('Error in habitController/createHabit: ', error);
        return;
    }
}

// Change the status of a habit 
module.exports.toggleStatus = async (req,res)=> {
    // console.log('Habit toggled');
    try {
        let id = req.query.id
        let date = req.query.date
        const habit = await Habit.findById(id)
        if(!habit){
            console.log('Habit does not exist');
            return res.redirect('/')
        }
        // Check if the date send in the request matches the date of the habit in the DB 
        let dates = habit.dates 
        let found = false

        dates.find((item)=>{
            if(item.date == date){
                if(item.complete === 'y'){
                    item.complete ='n'
                }else if(item.complete === 'n'){
                    item.complete = 'x'
                }else if(item.complete === 'x'){
                    item.complete = 'y'
                }
                found = true
            }
        })

        if(!found){
            dates.push({date: date, complete: 'y'})
        }
        habit.dates = dates;
        await habit.save();
        req.flash('success',"Status changed!!")
        return res.redirect('/');
    } catch (error) {
        console.log('Error in habitController/toggleStatus', error);
    }
}

// Deletes a habit 
module.exports.deleteHabit = async (req, res)=> {
    // console.log('Habit deleted');
    try {
        let id = req.query.id
        let user = req.user._id
        await Habit.deleteOne({_id: id, user: user})
        req.flash('success',"Habit Deleted!!")
        res.redirect('/')
    } catch (error) {
        console.log('Error in habitController/deleteHabit', error);
    }
}

// Edit Habit 
module.exports.editHabit = async (req, res)=> {
    console.log('Habit edited');
}

// This custom function return the MM DD format of date 
function getTodayDate(){
    var today = new Date();
    let date = today.getDate();
    let month = today.getMonth()+1;

    let fullDate = month + " " + date;
    return fullDate;
}

