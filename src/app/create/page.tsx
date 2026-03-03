"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import { CATEGORIES } from "../../data/articles";

interface FormData {
  title: string;
  author: string;
  content: string;
  category: string;
  asset: string;
  price: string;
  change: string;
}

interface FormErrors {
  title?: string;
  author?: string;
  content?: string;
  category?: string;
}

export default function CreateArticle() {
  const [form, setForm] = useState<FormData>({
    title: "",
    author: "",
    content: "",
    category: "",
    asset: "",
    price: "",
    change: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!form.title.trim()) newErrors.title = "Le titre est requis.";
    if (!form.author.trim()) newErrors.author = "L'auteur est requis.";
    if (!form.content.trim()) newErrors.content = "Le contenu est requis.";
    if (!form.category) newErrors.category = "Choisissez une categorie.";
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setShowModal(true);
  };

  const handleConfirm = () => {
    setShowModal(false);
    setSuccess(true);
    setForm({ title: "", author: "", content: "", category: "", asset: "", price: "", change: "" });
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      <div className="container mx-auto px-4 py-10 max-w-2xl">
        <h1 className="text-3xl font-bold mb-2">Publier une analyse</h1>
        <p className="text-base-content/50 mb-8">Partagez votre analyse de marche avec la communaute.</p>

        {success && (
          <div className="alert alert-success mb-6">
            <span>Votre analyse a ete publiee avec succes.</span>
          </div>
        )}

        <div className="card bg-base-100 shadow-xl p-8 space-y-5">
          <div className="form-control">
            <label className="label"><span className="label-text font-semibold">Titre de l'analyse *</span></label>
            <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Ex: Bitcoin : analyse technique" className={`input input-bordered w-full ${errors.title ? "input-error" : ""}`} />
            {errors.title && <span className="text-error text-sm mt-1">{errors.title}</span>}
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text font-semibold">Auteur *</span></label>
            <input type="text" name="author" value={form.author} onChange={handleChange} placeholder="Votre nom" className={`input input-bordered w-full ${errors.author ? "input-error" : ""}`} />
            {errors.author && <span className="text-error text-sm mt-1">{errors.author}</span>}
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text font-semibold">Categorie *</span></label>
            <select name="category" value={form.category} onChange={handleChange} className={`select select-bordered w-full ${errors.category ? "select-error" : ""}`}>
              <option value="">-- Choisir une categorie --</option>
              {CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            {errors.category && <span className="text-error text-sm mt-1">{errors.category}</span>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label"><span className="label-text font-semibold">Actif analyse</span><span className="label-text-alt">Optionnel</span></label>
              <input type="text" name="asset" value={form.asset} onChange={handleChange} placeholder="Ex: BTC/USD" className="input input-bordered w-full" />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text font-semibold">Prix actuel</span><span className="label-text-alt">Optionnel</span></label>
              <input type="text" name="price" value={form.price} onChange={handleChange} placeholder="Ex: 102,450" className="input input-bordered w-full" />
            </div>
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text font-semibold">Variation (%)</span><span className="label-text-alt">Optionnel</span></label>
            <input type="text" name="change" value={form.change} onChange={handleChange} placeholder="Ex: +5.24 ou -2.87" className="input input-bordered w-full" />
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text font-semibold">Contenu de l'analyse *</span></label>
            <textarea name="content" value={form.content} onChange={handleChange} placeholder="Redigez votre analyse detaillee..." rows={7} className={`textarea textarea-bordered w-full ${errors.content ? "textarea-error" : ""}`} />
            {errors.content && <span className="text-error text-sm mt-1">{errors.content}</span>}
          </div>

          <button className="btn btn-info w-full btn-lg font-bold" onClick={handleSubmit}>Publier l'analyse</button>
        </div>
      </div>

      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-sky-300">Confirmer la publication</h3>
            <p className="py-4 text-base-content/70">
              Voulez-vous publier cette analyse ?
              <span className="font-bold text-base-content mt-2 block">"{form.title}"</span>
            </p>
            <div className="modal-action">
              <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Annuler</button>
              <button className="btn btn-info font-bold" onClick={handleConfirm}>Confirmer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


