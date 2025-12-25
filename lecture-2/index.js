// Task 1
console.log('Task 1');

function addParamsToRequest(params) {
  let count = 0;
  return function (data) {
    count++;
    return { data, count, ...params };
  };
}

const sendData = addParamsToRequest({ accessToken: 'qwerty' });

const result = sendData({ id: '1', title: 'test' });

console.log(result);

// Task 2
console.log('Task 2');

const obj = {
  getData: function () {
    console.log(`Person name is: ${this.name} and age ${this.age}`);
  },
};

obj.getData.call({ name: 'John', age: 40 });

function showObjectData() {
  obj.getData.call({ name: 'John', age: 40 });
}
showObjectData();

//Task 3
console.log('Task 3');

const root = {
  name: 'name',
  type: 'folder',
  children: [
    {
      name: 'folder 1',
      type: 'folder',
      children: [
        {
          name: 'folder 2',
          type: 'folder',
          children: [
            {
              name: 'file 3',
              type: 'file',
              size: 30,
            },
          ],
        },
      ],
    },
    {
      name: 'file 1',
      type: 'file',
      size: 10,
    },
    {
      name: 'file 2',
      type: 'file',
      size: 20,
    },
  ],
};

function getFilenamesRecursively(treeNode) {
  let filenames = [];
  if (treeNode.type === 'folder') {
    for (let i = 0; i < treeNode.children.length; i++) {
      const nestedFilenames = getFilenamesRecursively(treeNode.children[i]);
      filenames = filenames.concat(nestedFilenames);
    }
  } else {
    filenames.push(treeNode.name);
  }
  return filenames;
}

const filenames = getFilenamesRecursively(root);
console.log(filenames);

//Task 4
console.log('Task 4');

class HumanClass {
  constructor(name, phone) {
    this.name = name;
    this.phone = phone;
  }

  introduce() {
    console.log(`Привіт, мене звати ${this.name}, мій номер ${this.phone}`);
  }
}

class StudentClass extends HumanClass {
  constructor(name, phone, course) {
    super(name, phone);
    this.course = course;
  }

  study() {
    console.log(`Я навчаюся на ${this.course} курсі.`);
  }
}

class TeacherClass extends HumanClass {
  constructor(name, phone, subject) {
    super(name, phone);
    this.subject = subject;
  }

  teach() {
    console.log(`Я викладаю ${this.subject}`);
  }
}

const firstStudent = new StudentClass('David', 123456789, 5);
firstStudent.introduce();
firstStudent.study();

const firstTeacher = new TeacherClass('John', 987654321, 'Web Development');
firstTeacher.introduce();
firstTeacher.teach();

function Human(name, phone) {
  this.name = name;
  this.phone = phone;
}

Human.prototype.introduce = function () {
  console.log(`Привіт, мене звати ${this.name}, мій номер ${this.phone}`);
};

function Student(name, phone, course) {
  Human.call(this, name, phone);
  this.course = course;
}

Student.prototype = Object.create(Human.prototype);
Student.prototype.constructor = Student;

Student.prototype.study = function () {
  console.log(`Я навчаюся на ${this.course} курсі.`);
};

function Teacher(name, phone, subject) {
  Human.call(this, name, phone);
  this.subject = subject;
}

Teacher.prototype = Object.create(Human.prototype);
Teacher.prototype.constructor = Teacher;

Teacher.prototype.teach = function () {
  console.log(`Я викладаю ${this.subject}`);
};

const secondStudent = new Student('David', 123456789, 5);
secondStudent.introduce();
secondStudent.study();

const secondTeacher = new Teacher('John', 987654321, 'Web Development');
secondTeacher.introduce();
secondTeacher.teach();
