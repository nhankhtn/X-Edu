const handlebars = require("handlebars");

module.exports = {
  sum: (a, b) => a + b,
  sub: (a, b) => a - b,
  trim: (a) => a.trim(),
  sortable: (field, sort) => {
    const sortType = field === sort.column ? sort.type : "default";
    const icons = {
      default: '<i class="bi bi-sort-down"></i>',
      asc: '<i class="bi bi-sort-down"></i>',
      desc: '<i class="bi bi-sort-up-alt"></i>',
    };
    const types = {
      default: "desc",
      asc: "desc",
      desc: "asc",
    };

    const icon = icons[sortType];
    const type = types[sortType];

    const href = handlebars.escapeExpression(
      `?_sort&column=${field}&type=${type}`
    );

    const output = `<a href="${href}">${icon}</a>`;
    return new handlebars.SafeString(output);
  },
  hasUser(user) {
    return user && user.id;
  },
  isAdmin(user) {
    return user && user.role === "admin";
  },
  formatCurrency(value, currency) {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency,
    }).format(value);
  },
  filterCourses(courses, key) {
    if (courses === undefined) return [];
    return courses.filter(course => course.category === key);
  },
  json(context) {
    return JSON.stringify(context);
  },
  getTime(time) {
    const date = new Date(time);
    return `${date.getHours()}:${date.getMinutes()}`;
  },
  getDate(time) {
    const date = new Date(time);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  },
  formatTime(time, format = 'verbose') {
    time = Math.floor(time);
    const h = Math.floor(time / 3600);
    const m = Math.floor((time % 3600) / 60);
    const s = Math.floor(time % 60);
    let timeFormatted = "";
    switch (format) {
      case 'verbose':
        if (h > 0) timeFormatted += `${h} giờ `;
        if (m > 0) timeFormatted += `${m} phút `;
        if (s > 0) timeFormatted += `${s} giây`;
        return timeFormatted;
      case 'short':
        if (h > 0) timeFormatted += `${h}h`;
        if (m > 0) timeFormatted += `${m}m`;
        if (s > 0) timeFormatted += `${s}s`;
        return timeFormatted;
      case 'colon':
        if (h > 0) timeFormatted += `${String(h).padStart(2, '0')}:`;
        if (m > 0) timeFormatted += `${String(m).padStart(2, '0')}:`;
        if (s > 0) timeFormatted += `${String(s).padStart(2, '0')}`;
        return timeFormatted;
      default:
        return 'Invalid format';
    }
  },
  countItem(object, key = "undefined", value = "undefined") {
    if (key !== "undefined" && value !== "undefined") {
      return object.filter(item => item[key] === value).length;
    }
    return object.length;
  },
  countItemCompleted(lessons, sectionNumber, lessonLatest) {
    return lessons.filter(lesson => lesson.sectionNumber === sectionNumber && lesson.lessonNumber < lessonLatest).length;
  },
  equal(a, b) {
    return a == b;
  },
  getSrcLesson(lessons, lessonNumber) {
    return lessons.find(lesson => lesson.lessonNumber === lessonNumber).url;
  },
  getTitleLesson(lessons, lessonNumber) {
    return lessons.find(lesson => lesson.lessonNumber === lessonNumber).title;
  },
  percent(lessonLatest, lessons) {
    return ((lessonLatest - 1) / lessons.length) * 100;
  }
};
