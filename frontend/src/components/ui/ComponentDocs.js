import React from 'react';
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';

const ComponentDocs = () => {
  const components = [
    {
      name: 'Button',
      description: 'A customizable button component with various styles and sizes',
      props: [
        { name: 'variant', type: 'string', default: 'primary', values: 'primary, secondary, danger, etc.' },
        { name: 'size', type: 'string', default: 'md', values: 'sm, md, lg' },
        { name: 'disabled', type: 'boolean', default: 'false' }
      ]
    },
    {
      name: 'Input',
      description: 'Form input field with validation states and labels',
      props: [
        { name: 'type', type: 'string', default: 'text' },
        { name: 'error', type: 'boolean', default: 'false' },
        { name: 'label', type: 'string' }
      ]
    },
    {
      name: 'Modal',
      description: 'Dialog/popup component with transitions',
      props: [
        { name: 'isOpen', type: 'boolean', required: true },
        { name: 'onClose', type: 'function', required: true }
      ]
    },
    {
      name: 'DataGrid',
      description: 'Advanced table with sorting, pagination and row selection',
      props: [
        { name: 'columns', type: 'array', required: true },
        { name: 'data', type: 'array', required: true },
        { name: 'pageSize', type: 'number', default: '10' }
      ]
    },
    {
      name: 'DatePicker',
      description: 'Interactive date selection component',
      props: [
        { name: 'selected', type: 'Date' },
        { name: 'onChange', type: 'function' }
      ]
    },
    // Include all other components in similar format
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">UI Components Documentation</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Installation</h2>
        <div className="bg-gray-800 text-gray-100 p-4 rounded-md font-mono text-sm">
          <div className="flex items-center justify-between">
            <span>npm install @heroicons/react</span>
            <button className="text-gray-300 hover:text-white">
              <ClipboardDocumentIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {components.map((component) => (
          <div key={component.name} className="border rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b">
              <h3 className="text-lg font-medium">{component.name}</h3>
              <p className="text-gray-600 mt-1">{component.description}</p>
            </div>
            <div className="p-4">
              <h4 className="font-medium mb-2">Props</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Name</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Type</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Default</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Values/Options</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {component.props.map((prop, i) => (
                      <tr key={i}>
                        <td className="px-4 py-2 whitespace-nowrap text-sm font-mono">{prop.name}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm">{prop.type}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm">{prop.default || '-'}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm">{prop.values || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComponentDocs;