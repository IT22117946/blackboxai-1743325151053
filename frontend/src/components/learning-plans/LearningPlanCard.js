import { Link } from 'react-router-dom';

const LearningPlanCard = ({ plan }) => {
  return (
    <div className="card">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{plan.title}</h3>
          <p className="mt-1 text-gray-600 line-clamp-2">{plan.description}</p>
        </div>
        <Link 
          to={`/plans/${plan.id}`}
          className="text-primary hover:text-primary-dark text-sm font-medium"
        >
          View
        </Link>
      </div>

      {plan.resources && Object.keys(plan.resources).length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-500">Resources</h4>
          <ul className="mt-1 space-y-1">
            {Object.entries(plan.resources).map(([name, url]) => (
              <li key={name}>
                <a 
                  href={url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline text-sm"
                >
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {plan.timeline && Object.keys(plan.timeline).length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-500">Timeline</h4>
          <ul className="mt-1 space-y-1">
            {Object.entries(plan.timeline).map(([milestone, date]) => (
              <li key={milestone} className="flex justify-between text-sm">
                <span>{milestone}</span>
                <span className="text-gray-500">{date}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LearningPlanCard;