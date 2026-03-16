// ==================================================
// FLAVOUR FIREKEEPER: KITCHEN (BUILD PHASE)
// ==================================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DndContext,
  type DragEndEvent,
  type DragStartEvent,
  DragOverlay,
  useDraggable,
  useDroppable,
  closestCenter,
} from '@dnd-kit/core';
import { useGameStore } from '../store/gameStore';
import { GAME_ROUNDS } from '../data/rounds';
import type { Ingredient, PreparedIngredient, PrepMethod, FlavorProfile } from '../types';
import { PREP_MODIFIERS } from '../data/ingredients';

// ==================================================
// INGREDIENT CARD COMPONENT
// ==================================================

interface IngredientCardProps {
  ingredient: Ingredient;
  isDragging?: boolean;
  showDetails?: boolean;
}

function IngredientCard({ ingredient, isDragging, showDetails }: IngredientCardProps) {
  const categoryColors: Record<string, string> = {
    woods: 'border-[#5d4037] bg-[#5d4037]/20',
    water: 'border-[#2980b9] bg-[#2980b9]/20',
    garden: 'border-[#27ae60] bg-[#27ae60]/20',
    meadow: 'border-[#f4d03f] bg-[#f4d03f]/20',
    skies: 'border-[#9b59b6] bg-[#9b59b6]/20',
  };

  return (
    <motion.div
      layout
      className={`ingredient-card p-3 ${categoryColors[ingredient.category]} 
        ${isDragging ? 'shadow-2xl scale-105' : ''}
        ${ingredient.isMandatory ? 'ring-2 ring-[#f39c12]/50' : ''}`}
    >
      <div className="flex items-center gap-2">
        <span className="text-2xl">{ingredient.emoji}</span>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-white text-sm truncate">
            {ingredient.name}
          </div>
          <div className={`category-badge category-${ingredient.category} text-[10px] mt-1`}>
            {ingredient.category}
          </div>
        </div>
        {ingredient.isMandatory && (
          <span className="text-xs text-[#f39c12]">★</span>
        )}
      </div>
      
      {showDetails && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          className="mt-2 pt-2 border-t border-white/10 text-xs text-gray-400"
        >
          {ingredient.description}
        </motion.div>
      )}
    </motion.div>
  );
}

// ==================================================
// DRAGGABLE INGREDIENT
// ==================================================

function DraggableIngredient({ ingredient }: { ingredient: Ingredient }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `pantry-${ingredient.id}`,
    data: { type: 'ingredient', ingredient },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <IngredientCard ingredient={ingredient} />
    </div>
  );
}

// ==================================================
// PREPARED INGREDIENT CARD
// ==================================================

interface PreparedIngredientCardProps {
  prepared: PreparedIngredient;
  index: number;
  onRemove: () => void;
  isDraggable?: boolean;
}

function PreparedIngredientCard({ prepared, index, onRemove, isDraggable }: PreparedIngredientCardProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `prepared-${index}`,
    data: { type: 'prepared', prepared, index },
    disabled: !isDraggable,
  });

  return (
    <motion.div
      ref={setNodeRef}
      {...(isDraggable ? { ...listeners, ...attributes } : {})}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: isDragging ? 0.5 : 1 }}
      exit={{ scale: 0, opacity: 0 }}
      className="relative group"
    >
      <div className="ingredient-card p-2 flex items-center gap-2">
        <span className="text-xl">{prepared.ingredient.emoji}</span>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-medium text-white truncate">
            {prepared.ingredient.name}
          </div>
          <div className="text-[10px] text-[#f39c12]">
            {PREP_MODIFIERS[prepared.prepMethod].description}
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="opacity-0 group-hover:opacity-100 w-5 h-5 rounded-full bg-red-500/20 
                     text-red-400 text-xs flex items-center justify-center transition-opacity"
        >
          ×
        </button>
      </div>
    </motion.div>
  );
}

// ==================================================
// DROP ZONE COMPONENT
// ==================================================

interface DropZoneProps {
  id: string;
  label: string;
  icon: string;
  children: React.ReactNode;
  className?: string;
}

function DropZone({ id, label, icon, children, className }: DropZoneProps) {
  const { isOver, setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`drop-zone p-4 ${isOver ? 'over' : ''} ${className}`}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl">{icon}</span>
        <span className="text-sm font-medium text-gray-300">{label}</span>
      </div>
      {children}
    </div>
  );
}

// ==================================================
// PREP METHOD SELECTOR
// ==================================================

interface PrepMethodSelectorProps {
  selected: PrepMethod;
  onSelect: (method: PrepMethod) => void;
}

function PrepMethodSelector({ selected, onSelect }: PrepMethodSelectorProps) {
  const methods: { method: PrepMethod; emoji: string; label: string }[] = [
    { method: 'raw', emoji: '🥬', label: 'Raw' },
    { method: 'roast', emoji: '🔥', label: 'Roast' },
    { method: 'boil', emoji: '♨️', label: 'Boil' },
    { method: 'simmer', emoji: '🍲', label: 'Simmer' },
    { method: 'toast', emoji: '🍞', label: 'Toast' },
    { method: 'mash', emoji: '🥔', label: 'Mash' },
    { method: 'caramelize', emoji: '🍯', label: 'Caramel' },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {methods.map(({ method, emoji, label }) => (
        <button
          key={method}
          onClick={() => onSelect(method)}
          className={`px-3 py-2 rounded-lg text-sm flex items-center gap-1 transition-all
            ${selected === method
              ? 'bg-[#d35400]/40 border-2 border-[#f39c12] text-white'
              : 'bg-white/5 border-2 border-white/10 text-gray-400 hover:border-white/30'
            }`}
        >
          <span>{emoji}</span>
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  );
}

// ==================================================
// FLAVOR PROFILE VISUALIZER
// ==================================================

interface FlavorProfileProps {
  profile: FlavorProfile;
  target?: Partial<FlavorProfile>;
}

function FlavorProfileVisualizer({ profile, target }: FlavorProfileProps) {
  const attributes: { key: keyof FlavorProfile; label: string; color: string }[] = [
    { key: 'sweetness', label: 'Sweet', color: '#f39c12' },
    { key: 'sourness', label: 'Sour', color: '#27ae60' },
    { key: 'bitterness', label: 'Bitter', color: '#8b4513' },
    { key: 'saltiness', label: 'Salt', color: '#3498db' },
    { key: 'umami', label: 'Umami', color: '#e74c3c' },
    { key: 'aromaIntensity', label: 'Aroma', color: '#9b59b6' },
  ];

  return (
    <div className="space-y-2">
      {attributes.map(({ key, label, color }) => (
        <div key={key} className="flex items-center gap-2">
          <span className="text-xs text-gray-400 w-12">{label}</span>
          <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden relative">
            {/* Target indicator */}
            {target?.[key] !== undefined && (
              <div
                className="absolute top-0 bottom-0 w-1 bg-white/50 z-10"
                style={{ left: `${(target[key]! / 10) * 100}%` }}
              />
            )}
            {/* Current value */}
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: color }}
              initial={{ width: 0 }}
              animate={{ width: `${(profile[key] / 10) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <span className="text-xs text-white w-6 text-right">
            {profile[key].toFixed(1)}
          </span>
        </div>
      ))}
    </div>
  );
}

// ==================================================
// ORDER CARD COMPONENT
// ==================================================

function OrderCard() {
  const currentRound = useGameStore(state => state.currentRound);
  const showHints = useGameStore(state => state.showHints);
  const round = GAME_ROUNDS[currentRound];

  if (!round) return null;

  const { order } = round;

  return (
    <div className="game-card p-4 mb-4">
      <div className="flex items-start gap-3">
        <div className="text-3xl">📜</div>
        <div className="flex-1">
          <div className="text-xs text-[#f39c12] uppercase tracking-wide mb-1">
            {order.customerName} requests:
          </div>
          <h3 className="text-lg font-bold text-white mb-1">
            {order.dishName}
          </h3>
          <p className="text-sm text-gray-400 mb-3">
            {order.dishDescription}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="text-xs px-2 py-1 bg-[#27ae60]/20 text-[#27ae60] rounded">
              🎯 {order.flavorGoal.description}
            </span>
            {order.requiredIngredients.map(id => (
              <span key={id} className="text-xs px-2 py-1 bg-[#f39c12]/20 text-[#f39c12] rounded">
                Required: {id}
              </span>
            ))}
          </div>

          {showHints && order.hints.length > 0 && (
            <div className="mt-3 p-2 bg-[#9b59b6]/10 rounded border border-[#9b59b6]/30">
              <div className="text-xs text-[#9b59b6] font-medium mb-1">💡 Hint:</div>
              <div className="text-xs text-gray-300">{order.hints[0]}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ==================================================
// MAIN KITCHEN COMPONENT
// ==================================================

type DragData = 
  | { type: 'ingredient'; ingredient: Ingredient }
  | { type: 'prepared'; prepared: PreparedIngredient };

export function Kitchen() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeData, setActiveData] = useState<DragData | null>(null);

  const currentRound = useGameStore(state => state.currentRound);
  const pantryIngredients = useGameStore(state => state.pantryIngredients);
  const prepAreaIngredients = useGameStore(state => state.prepAreaIngredients);
  const vesselIngredients = useGameStore(state => state.vesselIngredients);
  const selectedPrepMethod = useGameStore(state => state.selectedPrepMethod);
  const currentFlavorProfile = useGameStore(state => state.currentFlavorProfile);
  
  const addToPrepArea = useGameStore(state => state.addToPrepArea);
  const removeFromPrepArea = useGameStore(state => state.removeFromPrepArea);
  const addToVessel = useGameStore(state => state.addToVessel);
  const removeFromVessel = useGameStore(state => state.removeFromVessel);
  const setSelectedPrepMethod = useGameStore(state => state.setSelectedPrepMethod);
  const endBuildPhase = useGameStore(state => state.endBuildPhase);

  const round = GAME_ROUNDS[currentRound];

  // Category filter state
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  const filteredIngredients = categoryFilter
    ? pantryIngredients.filter(i => i.category === categoryFilter)
    : pantryIngredients;

  // Drag handlers
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
    setActiveData((event.active.data.current as DragData) ?? null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) {
      setActiveId(null);
      setActiveData(null);
      return;
    }

    const activeType = active.data.current?.type;
    const overId = over.id as string;

    if (activeType === 'ingredient' && overId === 'prep-area') {
      const ingredient = active.data.current?.ingredient as Ingredient;
      addToPrepArea(ingredient);
    }

    if (activeType === 'prepared' && overId === 'vessel') {
      const prepared = active.data.current?.prepared as PreparedIngredient;
      const index = active.data.current?.index as number;
      addToVessel(prepared);
      removeFromPrepArea(index);
    }

    setActiveId(null);
    setActiveData(null);
  };

  return (
    <div className="pt-20 pb-8 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Order Card */}
        <OrderCard />

        <DndContext
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            
            {/* Left: Pantry */}
            <div className="lg:col-span-4">
              <div className="game-card p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🏪</span>
                    <span className="font-medium text-white">Pantry</span>
                  </div>
                  <span className="text-xs text-gray-400">
                    {filteredIngredients.length} items
                  </span>
                </div>

                {/* Category filters */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {['woods', 'water', 'garden', 'meadow', 'skies'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setCategoryFilter(categoryFilter === cat ? null : cat)}
                      className={`category-badge category-${cat} ${
                        categoryFilter === cat ? 'ring-2 ring-white' : 'opacity-70'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Ingredients grid */}
                <div className="grid grid-cols-2 gap-2 max-h-[400px] overflow-y-auto">
                  {filteredIngredients.map(ingredient => (
                    <DraggableIngredient
                      key={ingredient.id}
                      ingredient={ingredient}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Center: Prep Area + Vessel */}
            <div className="lg:col-span-5">
              {/* Prep Method Selector */}
              <PrepMethodSelector
                selected={selectedPrepMethod}
                onSelect={setSelectedPrepMethod}
              />

              {/* Prep Area */}
              <DropZone
                id="prep-area"
                label="Prep Area"
                icon="🔪"
                className="mb-4 min-h-[120px]"
              >
                <div className="flex flex-wrap gap-2">
                  <AnimatePresence>
                    {prepAreaIngredients.map((prepared, index) => (
                      <PreparedIngredientCard
                        key={`prep-${index}`}
                        prepared={prepared}
                        index={index}
                        onRemove={() => removeFromPrepArea(index)}
                        isDraggable
                      />
                    ))}
                  </AnimatePresence>
                  {prepAreaIngredients.length === 0 && (
                    <div className="text-gray-500 text-sm italic">
                      Drag ingredients here to prepare them
                    </div>
                  )}
                </div>
              </DropZone>

              {/* Cooking Vessel */}
              <DropZone
                id="vessel"
                label="Cooking Vessel"
                icon="🥘"
                className="min-h-[150px]"
              >
                <div className="flex flex-wrap gap-2">
                  <AnimatePresence>
                    {vesselIngredients.map((prepared, index) => (
                      <PreparedIngredientCard
                        key={`vessel-${index}`}
                        prepared={prepared}
                        index={index}
                        onRemove={() => removeFromVessel(index)}
                      />
                    ))}
                  </AnimatePresence>
                  {vesselIngredients.length === 0 && (
                    <div className="text-gray-500 text-sm italic">
                      Drag prepared ingredients here to cook
                    </div>
                  )}
                </div>
              </DropZone>

              {/* Submit button */}
              <motion.button
                onClick={endBuildPhase}
                disabled={vesselIngredients.length === 0}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="game-button w-full mt-4 text-lg"
              >
                🍽️ Submit Dish & Start Biology Defense
              </motion.button>
            </div>

            {/* Right: Flavor Profile */}
            <div className="lg:col-span-3">
              <div className="game-card p-4 sticky top-24">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">📊</span>
                  <span className="font-medium text-white">Flavor Profile</span>
                </div>

                <FlavorProfileVisualizer
                  profile={currentFlavorProfile}
                  target={round?.order.flavorGoal.targetProfile}
                />

                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="text-xs text-gray-400 mb-2">Target:</div>
                  <div className="text-sm text-[#f39c12]">
                    {round?.order.flavorGoal.description}
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-xs text-gray-400 mb-2">
                    Ingredients: {vesselIngredients.length}/{round?.order.maxIngredients || 5}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {vesselIngredients.map((pi, i) => (
                      <span key={i} className="text-lg">{pi.ingredient.emoji}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Drag Overlay */}
          <DragOverlay>
            {activeId && activeData ? (
              <div className="opacity-90">
                {activeData.type === 'ingredient' && (
                  <IngredientCard
                    ingredient={activeData.ingredient}
                    isDragging
                  />
                )}
                {activeData.type === 'prepared' && (
                  <div className="ingredient-card p-2 flex items-center gap-2 bg-[#1a1a2e]">
                    <span className="text-xl">
                      {activeData.prepared.ingredient.emoji}
                    </span>
                    <span className="text-sm text-white">
                      {activeData.prepared.ingredient.name}
                    </span>
                  </div>
                )}
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}
