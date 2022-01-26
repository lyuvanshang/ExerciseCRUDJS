var courseApi = 'http://localhost:3000/courses';

function start(){

    getCourse(renderCourses);
    handleCreateForm();
};

start();

//Functions

function getCourse(callback)
{
    fetch(courseApi)
        .then(function(response)
        {
            return response.json();
        })
        .then(callback);
};

function createCourses(data, callback)
{
    fetch(courseApi,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(function(response)
    {
        return response.json();
    })
    .then(callback);
};

function handleEditCourse(id,data,callback)
{   
    fetch(`${courseApi}/${id}`,{
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
      .then(function(response)
      {
          return response.json();
      })
      .then(callback);
};


function handleDeleteCourse(id)
{
    fetch(`${courseApi}/${id}`,{
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
    })
    .then(function(response)
    {
        return response.json();
    })
    .then(function()
    {
        var courseItem = document.querySelector(`.course-item-${id}`)
        if(courseItem)
        {
            courseItem.remove()
        }
    });
}

function renderCourses(courses)
{
    var listCoursesBlock = document.querySelector('#list-courses');
    var htmls = courses.map(function(course)
    {
        return `
            <li class='course-item-${course.id}'>
                <h4 class = 'course-name-${course.id}'>${course.name}</h4>
                <p class = 'course-title-${course.id}'>${course.title}</p>
                <button onclick = handleDeleteCourse(${course.id}) style="cursor: pointer;">Delete</button>
                <button onclick = handleEditForm(${course.id}) style="cursor: pointer;">Edit</button>
            </li>
        `;
    });

    listCoursesBlock.innerHTML = htmls.join("");
}

function handleCreateForm()
{
    var createBtn = document.querySelector('#create');
    createBtn.onclick = function ()
        {
           var name = document.querySelector('input[name="name"]').value;
           var title = document.querySelector('input[name="title"]').value;
           var formData = {
            name: name,
            title: title
        }
        createCourses(formData, function()
        {
            getCourse(renderCourses);
        }); 
        }; 
};

function handleEditForm(id)
{   
    //chuyen doi button Create thanh Save
    document.querySelector('#create').id = "edit";
    document.querySelector('#edit').textContent = "Save";

    //du lieu auto input khi nhan vao edit

    document.querySelector('input[name="name"]').value = document.querySelector(`.course-name-${id}`).textContent;
    document.querySelector('input[name="title"]').value = document.querySelector(`.course-title-${id}`).textContent;

    var editBtn = document.querySelector('#edit')
    editBtn.onclick = function()
    {
        var name = document.querySelector('input[name="name"]').value;

        var title = document.querySelector('input[name="title"]').value;
        var formData = {
            name: name,
            title: title
        };
        handleEditCourse(id, formData);

        document.querySelector('input[name="name"]').value = '';
        document.querySelector('input[name="title"]').value = '';
    }



};