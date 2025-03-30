import { useState } from 'react';
import { ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/outline';

const TreeNode = ({ node, level = 0, onToggle, renderNode }) => {
  const [expanded, setExpanded] = useState(false);

  const hasChildren = node.children && node.children.length > 0;

  const handleToggle = () => {
    if (hasChildren) {
      setExpanded(!expanded);
    }
    onToggle?.(node, !expanded);
  };

  return (
    <div className="tree-node">
      <div 
        className={classNames(
          'flex items-center py-1 hover:bg-gray-50',
          `pl-${level * 4}`
        )}
        style={{ paddingLeft: `${level * 1}rem` }}
      >
        {hasChildren && (
          <button 
            onClick={handleToggle}
            className="mr-1 text-gray-500 hover:text-gray-700"
          >
            {expanded ? (
              <ChevronDownIcon className="h-4 w-4" />
            ) : (
              <ChevronRightIcon className="h-4 w-4" />
            )}
          </button>
        )}
        {!hasChildren && <div className="w-5" />}
        {renderNode ? renderNode(node) : (
          <div className="text-sm">
            {node.label}
          </div>
        )}
      </div>

      {expanded && hasChildren && (
        <div className="children">
          {node.children.map(childNode => (
            <TreeNode
              key={childNode.id}
              node={childNode}
              level={level + 1}
              onToggle={onToggle}
              renderNode={renderNode}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const TreeView = ({
  data,
  onToggle,
  renderNode,
  className = ''
}) => {
  return (
    <div className={classNames('tree-view', className)}>
      {data.map(node => (
        <TreeNode
          key={node.id}
          node={node}
          onToggle={onToggle}
          renderNode={renderNode}
        />
      ))}
    </div>
  );
};

export default TreeView;