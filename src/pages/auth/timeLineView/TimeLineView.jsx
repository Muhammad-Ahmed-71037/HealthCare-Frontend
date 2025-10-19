import { timelineData } from "../../../lib/constants";

const TimeLineView = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <h1 className="text-3xl font-bold text-center mb-12 text-gray-800">
        Project Timeline
      </h1>

      <div className="relative border-l-4 border-blue-500 max-w-3xl mx-auto">
        {timelineData.map((item, index) => (
          <div key={index} className="mb-10 ml-6">
            <div className="absolute w-4 h-4 bg-blue-500 rounded-full mt-2.5 -left-2 border border-white"></div>

            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
              <span className="text-sm text-blue-600 font-semibold">
                {item.year}
              </span>
              <h3 className="text-xl font-semibold text-gray-800 mt-1">
                {item.title}
              </h3>
              <p className="text-gray-600 mt-2">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeLineView;
