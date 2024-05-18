import pool from "../config/db.js";

const argumento = process.argv.slice(2);
const opcion = argumento[0]
let nombre = argumento[1]
let rut = argumento[2]
let curso = argumento[3]
let nivel = argumento[4]

//revisar conexion con la base de datos
/* const getconection = async()=>{
    try {
        const text = await pool.query("SELECT NOW()")
        console.log(text.rows)
    } catch (error) {
        console.log(error)
    }
}
getconection(); */

const addStudent = async ()=>{
    try {
        const text = "INSERT INTO estudiantes(nombre, rut, curso, nivel) values($1, $2, $3, $4) returning *";
        const values = [nombre, rut, curso, nivel];
        const response = await pool.query(text, values);
        console.log(response.rows);
    } catch (error) {
        console.log(error)
    }
};

const getStudents = async()=>{
    try {
        const response = await pool.query("SELECT * from estudiantes")
        console.log(response.rows)
    } catch (error) {
        console.log(error)
    }
};

const editStudents = async ()=>{
    try {
        const text = "UPDATE estudiantes set nombre = $1, curso = $3, nivel = $4 WHERE rut = $2 RETURNING *"
        const values = [nombre, rut, curso, nivel];
        const response = await pool.query(text, values);
        console.log(response.rows)
    } catch (error) {
        console.log(error)
    }
}

const deleteStudents = async()=>{
    try {
        const text = "delete from estudiantes where rut = $1"
        const values = [rut];
        const response = await pool.query(text, values);
        console.log(`Registro de estudiante con RUT ${rut} eliminado correctamente`)
    } catch (error) {
        console.log(error)
    }
};



if(opcion === 'add'){
    addStudent()
}else if(opcion === 'get'){
    getStudents()
}else if(opcion === 'edit'){
    editStudents()
}else if(opcion === 'delete'){
    rut = argumento[1]
    deleteStudents()
}else{
    console.log('Opcion Invalida')
}