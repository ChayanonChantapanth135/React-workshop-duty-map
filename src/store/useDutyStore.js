import { create } from "zustand";
import { api } from "../lib/api";

const dutyStore = (set, get) => ({
  personnel: [],
  locations: [],
  assignments: [],
  selectedLocationId: null,

  fetchAll: async () => {
    // fn body
    try {
      // const personnel = await api.get("/personnel");
      // const locations = await api.get("/locations");
      // const assignments = await api.get("/locationPersonnel");
      const [personnel, locations, assignments] = await Promise.all([
        api.get("/personnel"),
        api.get("/locations"),
        api.get("/locationPersonnel"),
      ]);
      // console.log("kaika", kaika);

      set({
        personnel: personnel,
        locations: locations,
        assignments: assignments,
      });
    } catch (error) {
      console.log(error);
    }
  },
  addLocation: async (lat, lng, name) => {
    // fn body
    try {
      const res = await api.post("/locations", {
        name: name,
        lat: Number(lat),
        lng: Number(lng),
        maxCapacity: 5,
      });
      await get().fetchAll();
    } catch (error) {
      console.log("Add Location Err", error);
    }
  },
  addPerson: async (name, position, avatar) => {
    try {
      await api.post("/personnel", {
        name: name,
        position: position,
        avatar: avatar,
      });
      await get().fetchAll();
    } catch (error) {
      console.log("Add Person Err", error);
    }
  },
  assignPerson: async (personId, locationId) => {
    // fn body
    try {
      const location = get().locations.find((l) => String(l.id) === String(locationId));
      if (!location) {
        console.warn("Location not found!");
        return;
      }

      // Count currently assigned personnel to target location
      const currentCount = get().assignments.filter(
        (a) => String(a.locationId) === String(locationId)
      ).length;

      const existingAssignment = get().assignments.find(
        (a) => String(a.personId) === String(personId)
      );

      // If already assigned to the same location, do nothing
      if (existingAssignment && String(existingAssignment.locationId) === String(locationId)) {
        return;
      }

      // Check if location is already full
      if (currentCount >= location.maxCapacity) {
        alert(`ไม่สามารถเพิ่มได้เนื่องจากจุดเข้าเวร "${location.name}" เต็มแล้ว (สูงสุด ${location.maxCapacity} คน)`);
        return;
      }

      if (existingAssignment) {
        // If assigned to a different location, update (PATCH) it
        await api.patch(`/locationPersonnel/${existingAssignment.id}`, {
          locationId: locationId,
        });
      } else {
        // Create new assignment
        await api.post("/locationPersonnel", {
          personId: personId,
          locationId: locationId,
        });
      }
      
      await get().fetchAll();
    } catch (error) {
      console.log(error);
    }
  },
  unassignPerson: async (personId) => {
    try {
      const assignment = get().assignments.find(
        (a) => String(a.personId) === String(personId)
      );
      if (assignment) {
        await api.delete(`/locationPersonnel/${assignment.id}`);
        await get().fetchAll();
      }
    } catch (error) {
      console.log("Unassign Person Err", error);
    }
  },
  deleteLocation: async (id) => {
    try {
      // Find all assignments linked to this location
      const relatedAssignments = get().assignments.filter(
        (a) => String(a.locationId) === String(id)
      );

      // Delete the location
      await api.delete(`/locations/${id}`);

      // Delete all related assignments
      await Promise.all(
        relatedAssignments.map((a) => api.delete(`/locationPersonnel/${a.id}`))
      );

      await get().fetchAll();
    } catch (error) {
      console.log("Delete Location Err", error);
    }
  },
});

const useDutyStore = create(dutyStore);

export default useDutyStore;
