import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, MapPin, Sparkles, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { useProblemStore } from '../../store/problemStore';
import { useToastStore } from '../../store/toastStore';
import { motion } from 'framer-motion';
import Button from '../../components/ui/Button';

export default function SubmitProblem() {
  const navigate = useNavigate();
  const { addProblem, isLoading } = useProblemStore();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    district: 'Ranchi',
    block: 'Kanke',
    urgency: 'medium',
    category: 'Infrastructure & Safety',
    imageUploaded: false,
    mediaUrls: [],
    lat: 23.3441,
    lng: 85.3096,
  });

  // Simulated AI Engine Auto-Classification (Section 3.6)
  const handleNextToAI = () => {
    // Basic heuristic to demonstrate dynamic AI suggestions
    if (formData.description.toLowerCase().includes('water') || formData.description.toLowerCase().includes('pump')) {
      setFormData(prev => ({ ...prev, category: 'Renewable Energy & Water', urgency: 'urgent' }));
    } else if (formData.description.toLowerCase().includes('road') || formData.description.toLowerCase().includes('bridge')) {
      setFormData(prev => ({ ...prev, category: 'Civil Infrastructure', urgency: 'high' }));
    }
    setStep(4);
  };


  const { showToast } = useToastStore();

  const handleGetLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({ ...prev, lat: position.coords.latitude, lng: position.coords.longitude }));
          showToast("Location updated successfully", "success");
        },
        (error) => showToast("Failed to get location. Please enable GPS.", "error")
      );
    } else {
      showToast("Geolocation not supported by this browser.", "error");
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, imageUploaded: true, mediaUrls: [reader.result] }));
        showToast("Image processed successfully", "success");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    const created = await addProblem({
      title: formData.title,
      description: formData.description,
      category: formData.category,
      urgency: formData.urgency,
      location: { district: formData.district, block: formData.block, lat: formData.lat, lng: formData.lng },
      mediaUrls: formData.mediaUrls,
    });
    
    if (created) {
      showToast("Problem reported successfully!", "success");
      navigate(`/problem/${created.id}`);
    } else {
      showToast("Failed to submit problem.", "error");
    }
  };

  return (
    <div className="min-h-screen bg-[#0F1B1E] text-[#F2EFE9] p-6 max-w-2xl mx-auto space-y-6">
      {/* Step Indicator Header */}
      <div className="space-y-2 border-b border-[#1D3238] pb-4">
        <span className="text-xs font-mono text-[#E8A33D] uppercase">Phase 3 • Step {step} of 5</span>
        <h1 className="text-2xl font-bold font-display">Report a Civic Problem</h1>
        <div className="flex gap-1 h-1.5 w-full bg-[#16262A] rounded-full overflow-hidden">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`h-full flex-1 transition-all ${
                i <= step ? 'bg-[#E8A33D]' : 'bg-[#1D3238]'
              }`}
            />
          ))}
        </div>
      </div>

      {/* STEP 1: Basic Information */}
      {step === 1 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} className="bg-[#16262A] p-6 rounded-xl border border-[#1D3238] space-y-4">
          <h2 className="text-lg font-bold font-display">1. Issue Information</h2>
          <div className="space-y-1">
            <label className="text-xs font-mono text-[#9BA8A6]">Problem Title</label>
            <input
              type="text"
              required
              placeholder="e.g., Damaged Solar Water Pump"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-[#0F1B1E] border border-[#1D3238] rounded-lg p-3 text-sm focus:outline-none focus:border-[#E8A33D]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-[#9BA8A6]">Detailed Description</label>
            <textarea
              rows={4}
              placeholder="Describe the issue, how long it has been present, and who is affected..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-[#0F1B1E] border border-[#1D3238] rounded-lg p-3 text-sm focus:outline-none focus:border-[#E8A33D]"
            />
          </div>

          <Button variant="primary" className="w-full py-2.5" onClick={() => setStep(2)}>
            Continue to Location <ArrowRight size={16} />
          </Button>
        </motion.div>
      )}

      {/* STEP 2: Location Selector */}
      {step === 2 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} className="bg-[#16262A] p-6 rounded-xl border border-[#1D3238] space-y-4">
          <h2 className="text-lg font-bold font-display">2. Pin Location</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-mono text-[#9BA8A6]">District</label>
              <input
                type="text"
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="w-full bg-[#0F1B1E] border border-[#1D3238] rounded-lg p-3 text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-mono text-[#9BA8A6]">Block / Locality</label>
              <input
                type="text"
                value={formData.block}
                onChange={(e) => setFormData({ ...formData, block: e.target.value })}
                className="w-full bg-[#0F1B1E] border border-[#1D3238] rounded-lg p-3 text-sm"
              />
            </div>
          </div>

          
          <div className="p-6 border border-dashed border-[#1D3238] rounded-lg bg-[#0F1B1E] text-center space-y-3">
            <MapPin className="mx-auto text-[#E8A33D]" size={32} />
            <p className="text-xs text-[#9BA8A6]">Interactive Map Picker (GPS Auto-Location)</p>
            <span className="block text-xs font-mono text-[#2F9E8F] bg-[#2F9E8F]/10 px-2 py-1 rounded w-max mx-auto mb-2">
              GPS Lat: {formData.lat.toFixed(4)}, Lng: {formData.lng.toFixed(4)}
            </span>
            <Button variant="outline" className="text-xs" onClick={handleGetLocation}>Use Current Location</Button>
          </div>


          <div className="flex gap-3">
            <Button variant="outline" className="w-full" onClick={() => setStep(1)}>
              <ArrowLeft size={16} /> Back
            </Button>
            <Button variant="primary" className="w-full" onClick={() => setStep(3)}>
              Continue to Media <ArrowRight size={16} />
            </Button>
          </div>
        </motion.div>
      )}

      {/* STEP 3: Media Upload */}
      {step === 3 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} className="bg-[#16262A] p-6 rounded-xl border border-[#1D3238] space-y-4">
          <h2 className="text-lg font-bold font-display">3. Upload Photos / Evidence</h2>
          
          <label className="p-8 border-2 border-dashed border-[#1D3238] hover:border-[#E8A33D] rounded-xl bg-[#0F1B1E] text-center space-y-3 cursor-pointer block transition-colors">
            <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
            {formData.imageUploaded ? (
              <img src={formData.mediaUrls[0]} alt="Preview" className="mx-auto h-32 object-cover rounded-lg" />
            ) : (
              <>
                <Camera className="mx-auto text-[#9BA8A6]" size={36} />
                <p className="text-sm font-semibold">Click to select photo</p>
                <p className="text-xs text-[#9BA8A6]">Supports JPG, PNG up to 10MB</p>
              </>
            )}
          </label>


          <div className="flex gap-3">
            <Button variant="outline" className="w-full" onClick={() => setStep(2)}>
              <ArrowLeft size={16} /> Back
            </Button>
            <Button variant="primary" className="w-full" onClick={handleNextToAI}>
              Run AI Engine Check <Sparkles size={16} />
            </Button>
          </div>
        </motion.div>
      )}

      {/* STEP 4: AI Classification Preview */}
      {step === 4 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} className="bg-[#16262A] p-6 rounded-xl border border-[#2F9E8F] space-y-4">
          <div className="flex items-center gap-2 text-[#2F9E8F]">
            <Sparkles size={20} />
            <h2 className="text-lg font-bold font-display">4. AI Analysis & Routing Preview</h2>
          </div>

          <div className="p-4 bg-[#0F1B1E] rounded-lg border border-[#1D3238] space-y-3 text-xs">
            <div className="flex justify-between">
              <span className="text-[#9BA8A6]">Detected Category:</span>
              <span className="font-bold text-[#E8A33D]">{formData.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#9BA8A6]">Calculated Urgency:</span>
              <span className="font-bold text-[#2F9E8F] uppercase">{formData.urgency}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#9BA8A6]">Suggested Match HEIs:</span>
              <span className="font-bold text-[#F2EFE9]">BIT Sindri, Ranchi University</span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="w-full" onClick={() => setStep(3)}>
              <ArrowLeft size={16} /> Back
            </Button>
            <Button variant="primary" className="w-full" onClick={() => setStep(5)}>
              Review & Submit <ArrowRight size={16} />
            </Button>
          </div>
        </motion.div>
      )}

      {/* STEP 5: Final Review & Confirmation */}
      {step === 5 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} className="bg-[#16262A] p-6 rounded-xl border border-[#1D3238] space-y-4">
          <h2 className="text-lg font-bold font-display">5. Review Your Report</h2>
          <div className="p-4 bg-[#0F1B1E] rounded-lg space-y-2 text-xs">
            <p><strong className="text-[#9BA8A6]">Title:</strong> {formData.title}</p>
            <p><strong className="text-[#9BA8A6]">Location:</strong> {formData.district}, {formData.block}</p>
            <p><strong className="text-[#9BA8A6]">Category:</strong> {formData.category}</p>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="w-full" onClick={() => setStep(4)}>
              <ArrowLeft size={16} /> Edit
            </Button>
            <Button variant="primary" className="w-full" onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? 'Submitting...' : 'Confirm Submission'} <CheckCircle size={16} />
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}