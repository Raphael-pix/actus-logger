import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Eye, EyeOff, PlusCircle } from "lucide-react";
import { useAdminStore } from "@/store/useAdminData";

const AddUserModal = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    conPassword: "",
    role: "User",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create user");
      }

      toast.success("User created sucessfully");
      router.refresh();
      useAdminStore.getState().fetchData();
    } catch (error) {
      setError(error);
      console.log("Error creating user", error);
    } finally{
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="black" size="sm" className="flex items-center gap-2">
          <PlusCircle size={16} />
          <span>Add user</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New User</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new user.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-3">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
              required
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter Password"
                required
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <div className="space-y-3">
            <Label htmlFor="conPassword">Confirm Password</Label>
            <Input
              id="conPassword"
              type="password"
              name="conPassword"
              value={formData.conPassword}
              onChange={handleChange}
              placeholder="Enter Password"
              required
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="role">Role</Label>
            <div className="flex items-center gap-4 space-x-6">
              <div className="space-x-2">
                <Checkbox
                  checked={formData.role === "Admin"}
                  onCheckedChange={() => {
                    setFormData({ ...formData, role: "Admin" });
                  }}
                  aria-label="Admin"
                />
                <Label>Admin</Label>
              </div>
              <div className="space-x-2">
                <Checkbox
                  checked={formData.role === "User"}
                  onCheckedChange={() => {
                    setFormData({ ...formData, role: "User" });
                  }}
                  aria-label="User"
                />
                <Label>User</Label>
              </div>
            </div>
          </div>

          {error && (
            <p className="text-destructive text-sm font-medium mt-2">{error.message}</p>
          )}

          <Button type="submit" variant="default" className="w-full mt-2" disabled={loading}>
            Create User
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserModal;
