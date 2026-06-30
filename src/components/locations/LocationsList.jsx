import { MapPin, Trash2 } from "lucide-react";
import useDutyStore from "../../store/useDutyStore";

// rafce
const LocationsList = () => {
  // JS
  const locations = useDutyStore((s) => s.locations);
  const personnel = useDutyStore((state) => state.personnel);
  const assignPerson = useDutyStore((state) => state.assignPerson);
  const assignments = useDutyStore((state) => state.assignments);
  const deleteLocation = useDutyStore((state) => state.deleteLocation);

  console.log(assignments);

  const onDropToLocation = async (e, locationId) => {
    const personId = e.dataTransfer.getData("text/plain");
    // console.log(personId, locationId);
    await assignPerson(personId, locationId);
  };

  const handleDelete = async (id) => {
    if (window.confirm("คุณต้องการลบจุดปฏิบัติงานนี้ใช่หรือไม่?")) {
      await deleteLocation(id);
    }
  };

  return (
    <div className="w-80 bg-white border-l shadow-lg border-gray-200 overflow-y-auto">
      <div className="p-6 border-b border-gray-200 bg-purple-100">
        <div className="flex gap-4 items-center">
          <MapPin className="text-purple-500" size={32} />
          <h2 className="text-2xl font-semibold">จุดเข้าเวร</h2>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {/* Loop */}
        {locations.map((item) => {
          // Find personnel assigned to this location
          const assignedPeople = assignments
            .filter((a) => a.locationId === item.id)
            .map((a) => personnel.find((p) => p.id === a.personId))
            .filter(Boolean);

          return (
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => onDropToLocation(e, item.id)}
              key={item.id}
              className="border-2 border-dashed rounded-lg border-gray-400 bg-gray-100"
            >
              <div className="flex justify-between p-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-sm text-gray-500">
                    {assignedPeople.length} / {item.maxCapacity}
                  </p>
                  
                  {/* Render assigned personnel */}
                  {assignedPeople.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {assignedPeople.map((person) => (
                        <div
                          key={person.id}
                          draggable={true}
                          onDragStart={(e) => {
                            e.dataTransfer.setData("text/plain", person.id);
                          }}
                          className="flex items-center gap-2 bg-white px-2 py-1 rounded border text-xs text-gray-700 shadow-sm cursor-move hover:bg-red-50 hover:border-red-200 transition-colors"
                        >
                          <span>{person.avatar}</span>
                          <span className="font-medium">{person.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500
             hover:bg-red-100 rounded-md p-2 h-fit"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default LocationsList;
