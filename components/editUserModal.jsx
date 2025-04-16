"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAdminStore } from "@/store/useAdminData";
import { useSiteStore } from "@/store/useSiteStore";

const EditUserModal = ({ user, open, onOpenChange }) => {
  const [formData, setFormData] = useState({
    role: user.role,
    locations: user.channels || [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { sites, fetchSites } = useSiteStore();

  useEffect(() => {
    fetchSites();
  }, [fetchSites]);

  const toggleLocation = (locationName) => {
    setFormData((prev) => {
      const exists = prev.locations.includes(locationName);
      return {
        ...prev,
        locations: exists
          ? prev.locations.filter((loc) => loc !== locationName)
          : [...prev.locations, locationName],
      };
    });
  };

  const handleRoleChange = (role) => {
    setFormData((prev) => ({ ...prev, role }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/update-user/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update user");

      toast.success("User updated successfully");
      useAdminStore.getState().fetchData();
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[60vh] overflow-hidden overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Edit User Details</DialogTitle>
          <DialogDescription>
            Modify user role and assigned locations.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-3">
            <Label>Role</Label>
            <div className="flex items-center gap-4 mt-2">
              <div className="space-x-2">
                <Checkbox
                  checked={formData.role === "Admin"}
                  onCheckedChange={() => handleRoleChange("Admin")}
                />
                <Label>Admin</Label>
              </div>
              <div className="space-x-2">
                <Checkbox
                  checked={formData.role === "User"}
                  onCheckedChange={() => handleRoleChange("User")}
                />
                <Label>User</Label>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Label>Assigned Locations</Label>
            <div className="grid grid-cols-2 gap-3 mt-3">
              {sites.map((location) => (
                <div key={location.id} className="flex items-center space-x-2">
                  <Checkbox
                    checked={formData.locations.includes(location.name)}
                    onCheckedChange={() => toggleLocation(location.name)}
                  />
                  <Label>{location.name}</Label>
                </div>
              ))}
            </div> 
          </div>

          {error && (
            <p className="text-destructive text-sm font-medium mt-2">
              {error.message}
            </p>
          )}

          <Button
            type="submit"
            variant="default"
            className="w-full mt-2"
            disabled={loading}
          >
            Save Changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserModal;
