import { Datepicker, FloatingLabel } from "flowbite-react";

export default function CreateEvent({ userId }) {
  let handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit");
    const newEvent = {
      title: e.target.title.value,
      description: e.target.description.value,
      creator: userId,
      date: e.target.date.value,
      start_time: e.target.start_time.value,
      end_time: e.target.end_time.value,
    };
    const res = await fetch("/api/createEvent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEvent),
    });
    const data = await res.json();
    console.log(data);
  };
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="mb-6">
        <label
          for="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="john.doe@company.com"
          name="title"
          required
        />
      </div>
      <div className="mb-6">
        <label
          for="date"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Date
        </label>
        <input
          type="date"
          id="date"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="john.doe@company.com"
          name="date"
          required
        />
      </div>
      <div className="mb-6">
        <label
          for="date"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Start time
        </label>
        <input
          type="time"
          id="time"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="john.doe@company.com"
          name="start_time"
          required
        />
      </div>
      <div className="mb-6">
        <label
          for="time"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          End time
        </label>
        <input
          type="time"
          id="time"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="john.doe@company.com"
          name="end_time"
          required
        />
      </div>
      <div className="mb-6">
        <label
          for="description"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Description
        </label>
        <textarea
          id="description"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          name="description"
        />
      </div>

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  );
}
