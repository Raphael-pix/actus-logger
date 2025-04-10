import React, { useState } from "react";
import { Link, Power } from "lucide-react";

const LocationsTab = ({ sites }) => {
  const [activeStates, setActiveStates] = useState(
    sites.map((site) => site.active !== false)
  );
  console.log(sites);

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    alert("URL copied to clipboard!");
  };

  const toggleActive = (index) => {
    const newActiveStates = [...activeStates];
    newActiveStates[index] = !newActiveStates[index];
    setActiveStates(newActiveStates);
  };
  // TODO: ADD search and filter functionality
  return (
    <div className="mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sites.map((location, index) => (
          <div key={index} className="bg-background shadow p-4 rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium text-foreground">{location.name}</h3>
              <div className="flex gap-4 items-center">
                <button
                  onClick={() => copyToClipboard(location.url || "")}
                  className="text-neutral-grey hover:text-neutral-black cursor-pointer"
                  title="Copy URL"
                >
                  <Link size={15} />
                </button>
                <button
                  onClick={() => toggleActive(index)}
                  className="text-neutral-grey hover:text-neutral-black cursor-pointer"
                  title="Deactivate site"
                >
                  <Power size={15} />
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span
                  className={`mr-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    activeStates[index]
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {activeStates[index] ? "Active" : "Inactive"}
                </span>
              </div>

              <div className="text-sm text-muted-foreground">
                {/* location.channels */}
                {0} {0 === 1 ? "channel" : "channels"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationsTab;
