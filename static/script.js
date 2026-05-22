
        const chunks = {
            1: { num: "Step 1: Core Base Setup", desc: "Drag the <strong>2-Foot PVC Pipe</strong> from the equipment manifest panel and drop it into the workbench canvas space.", targetAsset: "pvc", actionText: "Awaiting Pipe Placement..." },
            2: { num: "Step 2: Rough End Smoothing", desc: "The cut edges of the pipe are rough. Drag the <strong>Sandpaper Block</strong> onto the canvas over the PVC pipe to execute mechanical smoothing.", targetAsset: "sand", actionText: "Awaiting Sanding Block Sweep..." },
            3: { num: "Step 3: Interior Clearance Spacer", desc: "Drag the <strong>3\"x5\" Index Card Spacer</strong> onto the smoothed PVC pipe track to construct your temporary clearance sleeve wrapper.", targetAsset: "spacer", actionText: "Awaiting Clearance Card Placement..." },
            4: { num: "Step 4: Main Coil Chassis Form", desc: "Drag the <strong>5\"x8\" Index Card Chassis</strong> directly over your card spacer to form the permanent sliding cylinder base.", targetAsset: "chassis", actionText: "Awaiting Frame Form Alignment..." },
            5: { num: "Step 5: Structural Securement Anchors", desc: "Apply physical securement bands. Drag the <strong>Electrical Tape</strong> into the canvas matrix area to bind structural constraints down.", targetAsset: "tape", actionText: "Awaiting Boundary Securement Taping..." },
            6: { num: "Step 6: Target Turns Variable Blueprint Selection", desc: "Configure your design parameter choice below to define the target total windings strategy for this execution block run.", targetAsset: "form_fill", actionText: "Select loop configuration metrics.", fields: [
                { id: 'p1_wire_strategy', label: "Target Active Inductive Wire Turns Volume Counter Selection:", type: 'select', options: ["", "300-Turn Core Winding Layout Strategy", "400-Turn Enhanced Induction Layout Strategy"] }
            ]},
            7: { num: "Step 7: Inductor Line Application", desc: "Drag your selected wire count configuration package (<strong>300-Turn</strong> or <strong>400-Turn</strong>) onto the prepared sliding cylinder base form.", targetAsset: "wire_any", actionText: "Wrap structural copper tracks around index card form." },
            8: { num: "Step 8: Lead Terminal Insulation Stripping", desc: "Expose bare terminal connections. Drag the <strong>Sandpaper Block</strong> over both extended wire ends to scrub away enamel insulator matrices.", targetAsset: "sand", actionText: "Scrub lead insulation boundaries away." },
            9: { num: "Step 9: Part 1 - Electromagnet Planning Documentation", desc: "Establish your team baseline control metrics inside the form below before performing battery power configuration tests.", targetAsset: "form_fill", actionText: "Log planning parameters.", fields: [
                { id: 'p1_i3_predict', label: "Item 3 - Predict behaviors of a magnetic needle when placed near an active energized coil:", type: 'textarea', placeholder: "Describe expected rotational direction alignments..." }
            ]},
            10: { num: "Step 10: Part 1 - Indicator Diagnostic Instruments", desc: "Specify and analyze the operational physics behind your chosen tracking instrument systems.", targetAsset: "form_fill", actionText: "Provide validation mechanism tracking logs.", fields: [
                { id: 'p1_i4_toolname', label: "Item 4 - Target Field Indicator Instrument Name:", type: 'text', placeholder: "e.g., Magnetic Compass" },
                { id: 'p1_i4_evidence', label: "Evidence indicating an active magnetic field output presence:", type: 'select', options: ["", "Compass Needle Alignment Shifts / Rotates off normal North line", "Instrument needle holds perfectly frozen along baseline"] },
                { id: 'p1_i4_mechanism', label: "Scientific explanation of field line interactions with indicator component:", type: 'textarea', placeholder: "Connect torque forces to intersecting field vector matrices..." }
            ]},
            11: { num: "Step 11: Part 1 - Bill of Materials Indexing", desc: "Log the accurate inventory allocation index list chosen by your team to prove electromagnetic field configurations.", targetAsset: "form_fill", actionText: "Itemize selected equipment assets list.", fields: [
                { id: 'p1_i5_bom', label: "Item 5 - Enumerate inventory tools applied to demonstrate baseline electromagnetism:", type: 'textarea', placeholder: "List batteries, wrapped wire cores, iron nails..." }
            ]},
            12: { num: "Step 12: Part 1 - Procedural Step Sequencing", desc: "Draft a clear, repeatable process for configuring structural loops safely to verify electrical field properties.", targetAsset: "form_fill", actionText: "Provide operational steps mapping workflow instructions.", fields: [
                { id: 'p1_i6_procedure', label: "Item 6 - Procedural steps required to operate the test layout setup:", type: 'textarea', placeholder: "1. Mount coil... 2. Apply DC link terminals..." }
            ]},
            13: { num: "Step 13: Part 1 - Initial Blueprint Visualization", desc: "Render a comprehensive geometric mapping blueprint outlining how power elements connect directly into the coil ends.", targetAsset: "form_fill", actionText: "Provide diagrammatic drawing inputs.", fields: [
                { id: 'p1_i7_circuit_sketch', label: "Item 7 - Initial Geometric Circuit Configuration Layout Sketch:", type: 'sketch' }
            ]},
            14: { num: "Step 14: Part 1 - Design Approval Clearances", desc: "Review and register safety verification authorization token markers before running active loop circuit tasks.", targetAsset: "form_fill", actionText: "Validate configuration clearance indicators.", fields: [
                { id: 'p1_i10_clearance', label: "Item 10 - Instructor validation passcode marker (Type 'APPROVED_ELECTROMAGNET'):", type: 'text', placeholder: "Awaiting approval string entry..." }
            ]},
            15: { num: "Step 15: Part 1 - Electromagnet Activation Run", desc: "Drag the <strong>2x D-Cell Battery</strong> and the <strong>Magnetic Compass</strong> onto the workbench canvas dropzone to complete testing loops.", targetAsset: "circuit_p1", actionText: "Complete circuit leads connection mapping loops." },
            16: { num: "Step 16: Part 1 - Observational Real-Time Synthesis", desc: "Complete documentation fields summarizing performance behavior metrics captured during physical circuit interactions.", targetAsset: "form_fill", actionText: "Synthesize physical lab data results.", fields: [
                { id: 'p1_i11_observations', label: "Item 11 - Document clear, actionable test run observations captured on your dashboard:", type: 'textarea', placeholder: "State how the compass reacted upon power link engagement..." },
                { id: 'p1_i12_conclusions', label: "Item 12 - Synthesis conclusion detailing verification of field lines output:", type: 'textarea', placeholder: "Link observations directly back to magnetic vector proofs..." }
            ]},
            17: { num: "Step 17: Part 2 - Modification Engineering Blueprints", desc: "Design structural modifications to alter or reinforce localized magnetic field outputs.", targetAsset: "form_fill", actionText: "Draft modification specifications logs.", fields: [
                { id: 'p1_i13_modplan', label: "Item 13 - Engineering specification detailing modifications to reinforce magnetic flux output:", type: 'textarea', placeholder: "Explain plan to insert a high-permeability solid metal nail core..." },
                { id: 'p1_i13_mod_clearance', label: "Instructor modification safety check code (Type 'APPROVED_MODIFICATION'):", type: 'text', placeholder: "Awaiting validation string..." }
            ]},
            18: { num: "Step 18: Part 2 - High-Permeability Core Insertion", desc: "Execute modification blueprints. Drag the <strong>Ferromagnetic Core Nail</strong> directly inside your slider chassis structure.", targetAsset: "nail", actionText: "Insert structural iron nail amplifier inside cylinder core axis track." },
            19: { num: "Step 19: Part 2 - Core Modification Analytics", desc: "Record the upgraded performance metrics following the addition of the high-permeability medium.", targetAsset: "form_fill", actionText: "Complete upgraded configuration log records.", fields: [
                { id: 'p1_i14_mod_obs', label: "Item 14 - Detailed observation metrics documenting modified field changes:", type: 'textarea', placeholder: "Quantify increased compass deflection rates or intensity modifications..." },
                { id: 'p1_i15_mod_con', label: "Item 15 - State how your core addition altered localized flux density coefficients:", type: 'textarea', placeholder: "Explain domain alignment parameters within iron core substrates..." }
            ]},
            20: { num: "Step 20: Part 3 - Induction System Setup Criteria", desc: "Transition from mechanical energy paths into electrical potential lines. Configure dynamic tracking parameters below.", targetAsset: "form_fill", actionText: "Configure induction planning criteria matrix.", fields: [
                { id: 'p1_i17_induction_method', label: "Item 17 - Chosen method for producing an active changing magnetic flux profile over time:", type: 'select', options: ["", "Physically dropping Neodymium Magnets rapidly through track channel pipelines", "Holding target magnet stack completely static along external track limits"] },
                { id: 'p1_i18_ind_tool', label: "Item 18 - Target Induction Diagnostic Indicator Instrument Name:", type: 'text', placeholder: "e.g., Digital Multimeter" },
                { id: 'p1_i18_ind_evidence', label: "Target evidentiary manifestation denoting open terminal induction current tracking:", type: 'select', options: ["", "Transient potential difference voltage peaks registering on monitor display line", "Unchanging flatline reading maintaining exactly zero output tracking profile"] },
                { id: 'p1_i18_ind_physics', label: "Faraday's Law structural mechanics explanation text:", type: 'textarea', placeholder: "Connect moving boundary lines to active electromotive potential generations..." }
            ]},
            21: { num: "Step 21: Part 3 - Induction Materials Tracking", desc: "Register structural assets designated to capture open terminal potential spikes accurately.", targetAsset: "form_fill", actionText: "Enumerate induction instrument allocation criteria.", fields: [
                { id: 'p1_i19_ind_bom', label: "Item 19 - Formulate full dynamic materials requirements list planned for induction testing runs:", type: 'textarea', placeholder: "Identify meters, tracks, sliders, and target field magnets..." }
            ]},
            22: { num: "Step 22: Part 3 - Induction Procedural Architecture", desc: "Draft workflow sequences and kinetic trajectories to cut wire loops effectively.", targetAsset: "form_fill", actionText: "Validate sequence blueprints specifications.", fields: [
                { id: 'p1_i20_ind_proc', label: "Item 20 - Step-by-step description for executing the dynamic induction lab run safely:", type: 'textarea', placeholder: "Enumerate manual dropping loops, speed variables, and display logging maps..." },
                { id: 'p1_i21_ind_sketch', label: "Item 21 - Visual mapping sketch displaying expected induction flow configurations:", type: 'sketch' },
                { id: 'p1_i22_ind_clearance', label: "Instructor clearance signature code (Type 'APPROVED_INDUCTION'):", type: 'text', placeholder: "Awaiting approval verification string..." }
            ]},
            23: { num: "Step 23: Part 3 - Induction Execution Run", desc: "Drag the <strong>Digital Multimeter</strong> and <strong>Neodymium Magnets</strong> onto the canvas workspace to complete real-time logging links.", targetAsset: "circuit_p3", actionText: "Drop field elements dynamically across loop track zones." },
            24: { num: "Step 24: Part 3 - Induction Data Recording", desc: "Log live induction terminal outputs and synthesize results from the multimeter's screen snapshots.", targetAsset: "form_fill", actionText: "Log inductive potential data.", fields: [
                { id: 'p1_i25_ind_obs', label: "Item 25 - Log observed potential difference variations across terminal parameters:", type: 'textarea', placeholder: "Detail observed voltage peaks and evaluate screen refresh response times..." },
                { id: 'p1_i26_ind_con', label: "Item 26 - Synthesize final induction performance profile analysis conclusion statement:", type: 'textarea', placeholder: "Connect the rate of change of intersecting field vectors to peak output values..." }
            ]},
            25: { num: "Step 25: Part 4 - Forward Threshold Verification", desc: "Drag the <strong>Red LED</strong> and <strong>Blue LED</strong> onto the workspace. Drop magnets through the pipe track to evaluate forward threshold voltage requirements.", targetAsset: "circuit_p4", actionText: "Surpass forward breakdown voltage barriers.", fields: [
                { id: 'p1_i27_thresh_clearance', label: "Instructor parameter baseline signature lock code (Type 'APPROVED_THRESHOLD'):", type: 'text', placeholder: "Awaiting final configuration string..." },
                { id: 'p1_i29_thresh_obs', label: "Item 29 - Contrast the drop profiles and loop density variables required to power Red versus Blue LEDs:", type: 'textarea', placeholder: "Explain semiconductor bandgap constraints matching observed flash points..." }
            ]}
        };

        let currentChunk = 1;
        let studentAnswers = {};
        let activeCanvasDrawings = {};
        let selectedCoilTurns = "";
        let dragElement = null;
        let startX = 0, startY = 0;
        let isDrawing = false;
        let lastX = 0, lastY = 0;
        let droppedMagnetCount = 0;

        window.onload = function() {
            checkForUrlResumedState();
            renderChunk();
        };

        function switchMainTab(tabId) {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            if (tabId === 'P1') {
                document.getElementById('tabBtnP1').classList.add('active');
                document.getElementById('tabContentP1').classList.add('active');
            } else {
                document.getElementById('tabBtnP2').classList.add('active');
                document.getElementById('tabContentP2').classList.add('active');
                initializePacket2Sketches();
            }
        }

        function renderChunk() {
            const chunk = chunks[currentChunk];
            document.getElementById('stepNumberLabel').innerText = `Step ${currentChunk} of 25`;
            document.getElementById('taskObjective').innerHTML = chunk.desc;
            document.getElementById('canvasHud').innerText = `Objective: ${chunk.actionText}`;
            
            document.getElementById('btnPrevStep').disabled = (currentChunk === 1);
            document.getElementById('btnNextStep').disabled = true;
            document.getElementById('statusAlert').style.display = 'none';
            
            const formContainer = document.getElementById('formContainer');
            formContainer.innerHTML = "";
            refreshPhysicalSkins();

            if (chunk.targetAsset === "form_fill" || chunk.fields) {
                chunk.fields.forEach(f => {
                    const label = document.createElement('label');
                    label.innerText = f.label;
                    formContainer.appendChild(label);

                    if (f.type === 'select') {
                        const sel = document.createElement('select');
                        sel.id = f.id;
                        f.options.forEach(o => {
                            const opt = document.createElement('option');
                            opt.value = o; opt.innerText = o;
                            sel.appendChild(opt);
                        });
                        if (studentAnswers[f.id]) sel.value = studentAnswers[f.id];
                        sel.onchange = function() {
                            studentAnswers[f.id] = sel.value;
                            if(f.id === 'p1_wire_strategy') selectedCoilTurns = sel.value.includes("400") ? "400" : "300";
                            validateInputs();
                        };
                        formContainer.appendChild(sel);
                    } else if (f.type === 'text' || f.type === 'textarea') {
                        const tag = f.type === 'textarea' ? 'textarea' : 'input';
                        const inp = document.createElement(tag);
                        if(f.type === 'text') inp.type = 'text'; else inp.rows = 3;
                        inp.id = f.id;
                        inp.placeholder = f.placeholder;
                        if (studentAnswers[f.id]) inp.value = studentAnswers[f.id];
                        inp.oninput = function() { studentAnswers[f.id] = inp.value; validateInputs(); };
                        formContainer.appendChild(inp);
                    } else if (f.type === 'sketch') {
                        createSketchpadWidget(f.id, formContainer);
                    }
                });
                validateInputs();
            } else {
                formContainer.innerHTML = "<span style='color:#64748b; font-size:0.85em;'>Manipulate physical assets on the laboratory workbench dropzone to satisfy this operational step.</span>";
                evaluateSandboxPhysics();
            }
        }

        function createSketchpadWidget(id, container) {
            const wrapper = document.createElement('div');
            wrapper.className = 'sketch-container';
            
            const canvas = document.createElement('canvas');
            canvas.id = id + "_canvas";
            canvas.className = 'sketch-canvas';
            canvas.width = 380; canvas.height = 120;
            
            const ctx = canvas.getContext('2d');
            ctx.strokeStyle = '#2b5797'; ctx.lineWidth = 2.5; ctx.lineCap = 'round';

            if (activeCanvasDrawings[id]) {
                const img = new Image();
                img.src = activeCanvasDrawings[id];
                img.onload = function() { ctx.drawImage(img, 0, 0); };
            }

            canvas.addEventListener('mousedown', (e) => {
                isDrawing = true;
                const rect = canvas.getBoundingClientRect();
                lastX = e.clientX - rect.left; lastY = e.clientY - rect.top;
            });
            canvas.addEventListener('mousemove', (e) => {
                if (!isDrawing) return;
                const rect = canvas.getBoundingClientRect();
                const currX = e.clientX - rect.left; const currY = e.clientY - rect.top;
                ctx.beginPath(); ctx.moveTo(lastX, lastY); ctx.lineTo(currX, currY); ctx.stroke();
                lastX = currX; lastY = currY;
                activeCanvasDrawings[id] = canvas.toDataURL();
                studentAnswers[id] = "DRAWING_EXISTS";
                validateInputs();
            });
            window.addEventListener('mouseup', () => { isDrawing = false; });

            const controls = document.createElement('div');
            controls.className = 'sketch-controls';
            controls.innerHTML = `<span>Draw Field Vectors Grid</span>`;
            const clrBtn = document.createElement('button');
            clrBtn.className = 'sketch-btn'; clrBtn.innerText = 'Clear';
            clrBtn.onclick = function(e) {
                e.preventDefault();
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                delete activeCanvasDrawings[id];
                delete studentAnswers[id];
                validateInputs();
            };
            controls.appendChild(clrBtn);
            wrapper.appendChild(canvas);
            wrapper.appendChild(controls);
            container.appendChild(wrapper);
        }

        function initializePacket2Sketches() {
            const container3 = document.getElementById('p2_q3_sketch_container');
            if (container3 && !container3.hasChildNodes()) createSketchpadWidget('p2_q3_sketch', container3);
            const container7 = document.getElementById('p2_q7_sketch_container');
            if (container7 && !container7.hasChildNodes()) createSketchpadWidget('p2_q7_sketch', container7);
        }

        function allowDrop(ev) { ev.preventDefault(); }
        function spawnAsset(ev, type) { ev.dataTransfer.setData("text/plain", type); }

        function handleDrop(ev) {
            ev.preventDefault();
            const type = ev.dataTransfer.getData("text/plain");
            const chunk = chunks[currentChunk];
            
            if (chunk && (chunk.targetAsset === type || (chunk.targetAsset === "wire_any" && (type === 'wire300' || type === 'wire400')))) {
                executeVisualChunkAction(type);
            } else {
                executeGenericHWSpawn(type, ev.clientX, ev.clientY);
            }
        }

        function executeVisualChunkAction(asset) {
            if (currentChunk === 1) {
                document.getElementById('pvcTrack').style.display = 'block';
                markStepReady("2-Foot PVC Support Pipe dropped securely onto canvas layout.");
            } else if (currentChunk === 2) {
                document.getElementById('pvcTrack').classList.add('sanded');
                markStepReady("Pipe face finish polished smooth via mechanical abrasive sanding.");
            } else if (currentChunk === 3) {
                document.getElementById('vSpacer').style.display = 'block';
                markStepReady("Temporary 3\"x5\" index card clearance spacer wrapped.");
            } else if (currentChunk === 4) {
                document.getElementById('vChassis').style.display = 'block';
                markStepReady("Permanent 5\"x8\" paper tube chassis aligned over spacer.");
            } else if (currentChunk === 5) {
                document.getElementById('vTapeL').style.display = 'block'; document.getElementById('vTapeR').style.display = 'block';
                markStepReady("Structural edge tape boundary securement sealed.");
            } else if (currentChunk === 7) {
                selectedCoilTurns = asset.includes("400") ? "400" : "300";
                refreshPhysicalSkins();
                markStepReady(`Inductor matrix wire lines tightly coiled (~${selectedCoilTurns} windings completed).`);
            } else if (currentChunk === 8) {
                document.getElementById('vLeadL').classList.add('stripped'); document.getElementById('vLeadR').classList.add('stripped');
                markStepReady("Insulator layer polished clear. Conducting bare alloy junctions fully exposed.");
            } else if (currentChunk === 18) {
                document.getElementById('vShield').style.display = 'block';
                markStepReady("Ferromagnetic core nail insert slid directly along the cylinder central axis line.");
            }
        }

        function executeGenericHWSpawn(type, clientX, clientY, recoveredStyle = null) {
            if(!type) return;
            const dropzone = document.getElementById('canvasDropzone');
            const rect = dropzone.getBoundingClientRect();
            
            let x = clientX - rect.left - 25; 
            let y = clientY - rect.top - 20;

            const uid = (type === 'magnet') ? `hw_inst_magnet_${Date.now()}_${Math.floor(Math.random()*1000)}` : `hw_live_${type}`;
            
            if (type !== 'magnet' && document.getElementById(uid)) {
                document.getElementById(uid).remove();
            }

            const div = document.createElement('div');
            div.id = uid;
            div.className = `drag-element hw-item hw-${type}`;
            div.setAttribute('data-type', type);
            
            if (recoveredStyle) {
                div.style.left = recoveredStyle.left;
                div.style.top = recoveredStyle.top;
            } else {
                div.style.left = `${Math.max(5, Math.min(x, rect.width - 85))}px`;
                div.style.top = `${Math.max(5, Math.min(y, rect.height - 65))}px`;
            }
            
            div.setAttribute('onmousedown', `initDrag(event, '${div.id}')`);
            
            div.addEventListener('dblclick', function() {
                if(type === 'magnet') droppedMagnetCount = Math.max(0, droppedMagnetCount - 1);
                div.remove();
                evaluateSandboxPhysics();
            });

            if (type === 'compass') {
                div.innerHTML = `<div class="compass-needle" id="needle_node"></div>`;
            } else if (type === 'battery') {
                div.innerText = '2x D-CELL';
            } else if (type === 'dmm') {
                div.innerHTML = `<div class="lcd-panel" id="dmmLcd">0.00 V</div><div>DMM</div>`;
            } else if (type === 'magnet') {
                div.innerText = 'NEOD';
                droppedMagnetCount++;
            } else {
                div.innerText = type.toUpperCase();
            }

            dropzone.appendChild(div);
            evaluateSandboxPhysics();
        }

        function initDrag(e, id) {
            if(e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;
            e.preventDefault();
            dragElement = document.getElementById(id);
            startX = e.clientX - dragElement.offsetLeft; startY = e.clientY - dragElement.offsetTop;
            document.onmousemove = doDrag; document.onmouseup = stopDrag;
        }
        function doDrag(e) {
            if (!dragElement) return;
            const dropzone = document.getElementById('canvasDropzone');
            const rect = dropzone.getBoundingClientRect();
            let left = e.clientX - startX; let top = e.clientY - startY;
            left = Math.max(0, Math.min(left, rect.width - dragElement.offsetWidth));
            top = Math.max(0, Math.min(top, rect.height - dragElement.offsetHeight));
            dragElement.style.left = left + 'px'; dragElement.style.top = top + 'px';
            evaluateSandboxPhysics();
        }
        function stopDrag() { dragElement = null; document.onmousemove = null; document.onmouseup = null; }

        function evaluateSandboxPhysics() {
            const hasBattery = document.getElementById('hw_live_battery') !== null;
            const hasAnyMagnet = document.querySelectorAll('.hw-magnet').length > 0;
            const compassNeedle = document.getElementById('needle_node');
            const dmmDisplay = document.getElementById('dmmLcd');
            const redLed = document.getElementById('hw_live_ledred');
            const blueLed = document.getElementById('hw_live_ledblue');

            if (compassNeedle) {
                if (hasBattery) {
                    compassNeedle.style.transform = "rotate(65deg)"; 
                } else if (hasAnyMagnet) {
                    compassNeedle.style.transform = "rotate(145deg)"; 
                } else {
                    compassNeedle.style.transform = "rotate(0deg)";
                }
            }

            if (dmmDisplay) {
                if (hasAnyMagnet) {
                    let totalActiveMagnets = document.querySelectorAll('.hw-magnet').length;
                    let calculatedVolt = (totalActiveMagnets * 1.42).toFixed(2);
                    dmmDisplay.innerText = `${calculatedVolt} V`;
                } else {
                    dmmDisplay.innerText = "0.00 V";
                }
            }

            if (currentChunk === 15 && hasBattery && document.getElementById('hw_live_compass')) {
                markStepReady("Circuit paths completed. External DC linkage induces clear compass torque rotation deflection.");
            } else if (currentChunk === 23 && document.getElementById('hw_live_dmm') && hasAnyMagnet) {
                markStepReady("Kinetic boundary crossing monitored. Dynamic flux cutting delivers clear electromotive voltage spike peaks.");
            } else if (currentChunk === 25 && hasAnyMagnet && (redLed || blueLed)) {
                if (redLed) redLed.classList.add('lit-red');
                if (blueLed && selectedCoilTurns === "400") {
                    blueLed.classList.add('lit-blue');
                    markStepReady("High breakdown potential crossed. Enhanced 400-turn energy induction generates enough forward voltage to flash Blue indicator structures!");
                } else if (blueLed) {
                    markStepReady("Lower potential barrier reached. The 300-turn coil flashes the Red LED, but falls short of the Blue LED forward threshold energy requirements.");
                } else {
                    markStepReady("Semiconductor interaction logged. Connect other indicators to review forward breakdown threshold variables.");
                }
            } else {
                if ((currentChunk === 1 && document.getElementById('pvcTrack').style.display === 'block') ||
                    (currentChunk === 2 && document.getElementById('pvcTrack').classList.contains('sanded')) ||
                    (currentChunk === 3 && document.getElementById('vSpacer').style.display === 'block') ||
                    (currentChunk === 4 && document.getElementById('vChassis').style.display === 'block') ||
                    (currentChunk === 5 && document.getElementById('vTapeL').style.display === 'block')) {
                    markStepReady("Action requirement matched. Assembly validation checks authorized.");
                }
            }
        }

        function validateInputs() {
            const chunk = chunks[currentChunk];
            if (!chunk || !chunk.fields) return;
            let allValid = true;
            chunk.fields.forEach(f => {
                if (!studentAnswers[f.id] || studentAnswers[f.id].trim() === "") allValid = false;
                if (f.id === 'p1_i10_clearance' && studentAnswers[f.id] !== 'APPROVED_ELECTROMAGNET') allValid = false;
                if (f.id === 'p1_i13_mod_clearance' && studentAnswers[f.id] !== 'APPROVED_MODIFICATION') allValid = false;
                if (f.id === 'p1_i22_ind_clearance' && studentAnswers[f.id] !== 'APPROVED_INDUCTION') allValid = false;
                if (f.id === 'p1_i27_thresh_clearance' && studentAnswers[f.id] !== 'APPROVED_THRESHOLD') allValid = false;
            });
            document.getElementById('btnNextStep').disabled = !allValid;
            if (allValid) {
                const alertBox = document.getElementById('statusAlert');
                alertBox.className = "alert-success"; alertBox.innerText = "All documentation requirements verified for this step form module layout."; alertBox.style.display = "block";
            }
        }

        function markStepReady(msg) {
            const alertBox = document.getElementById('statusAlert');
            alertBox.className = "alert-success"; alertBox.innerText = msg; alertBox.style.display = "block";
            document.getElementById('btnNextStep').disabled = false;
        }

        function progressToNextStep() {
            if (currentChunk < 25) { currentChunk++; renderChunk(); }
            else { alert("Packet 1 operational lab tracking protocols fully finished! Proceed to review Packet 2 tabs."); }
        }
        function regressToPreviousStep() {
            if (currentChunk > 1) { currentChunk--; renderChunk(); }
        }

        function refreshPhysicalSkins() {
            document.getElementById('vSpacer').style.display = (currentChunk >= 4) ? 'block' : 'none';
            document.getElementById('vChassis').style.display = (currentChunk >= 5) ? 'block' : 'none';
            document.getElementById('vTapeL').style.display = (currentChunk >= 6) ? 'block' : 'none';
            document.getElementById('vTapeR').style.display = (currentChunk >= 6) ? 'block' : 'none';
            document.getElementById('vCoil').style.display = (currentChunk >= 8) ? 'block' : 'none';
            document.getElementById('vLeadL').style.display = (currentChunk >= 8) ? 'block' : 'none';
            document.getElementById('vLeadR').style.display = (currentChunk >= 8) ? 'block' : 'none';
            if (selectedCoilTurns === '400') document.getElementById('vCoil').classList.add('turns-400');
            else document.getElementById('vCoil').classList.remove('turns-400');
        }

        function saveP2Data(id) { studentAnswers[id] = document.getElementById(id).value; }
        function saveP2Radio(name, value) { studentAnswers[name] = value; }

        function generateResumeStateLink() {
            const activeElementsMetadata = [];
            document.querySelectorAll('.workspace-canvas .hw-item').forEach(el => {
                activeElementsMetadata.push({
                    type: el.getAttribute('data-type'),
                    style: { left: el.style.left, top: el.style.top }
                });
            });

            const tracksLayoutState = {
                pvcVisible: document.getElementById('pvcTrack').style.display === 'block',
                pvcSanded: document.getElementById('pvcTrack').classList.contains('sanded'),
                spacerVisible: document.getElementById('vSpacer').style.display === 'block',
                chassisVisible: document.getElementById('vChassis').style.display === 'block',
                tapeLVisible: document.getElementById('vTapeL').style.display === 'block',
                coilVisible: document.getElementById('vCoil').style.display === 'block',
                leadsStripped: document.getElementById('vLeadL').classList.contains('stripped'),
                shieldVisible: document.getElementById('vShield').style.display === 'block'
            };

            const statePayload = {
                chunk: currentChunk,
                answers: studentAnswers,
                sketches: activeCanvasDrawings,
                turns: selectedCoilTurns,
                canvasAssets: activeElementsMetadata,
                tracksState: tracksLayoutState
            };

            try {
                const plainTextJson = JSON.stringify(statePayload);
                const safeStringUrlComponent = encodeURIComponent(plainTextJson);
                const compressedTokenBase64 = btoa(safeStringUrlComponent);
                
                let currentCleanUrl = window.location.href.split('?')[0]; 
                const finalGeneratedUrl = currentCleanUrl + "?resume=" + compressedTokenBase64;
                
                // --- NEW URL SHORTENER INTEGRATION ---
                // Send the massive URL to YOUR OWN Flask server instead of is.gd directly
                fetch('/api/shorten', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ url: finalGeneratedUrl })
                })
                .then(response => {
                    if (!response.ok) throw new Error("Server shortener failed");
                    return response.json();
                })
                .then(data => {
                    if (data.success) {
                        // Update the UI with the clean, short link returned by Flask
                        document.getElementById('resumeUrlOutput').innerText = data.shortUrl;
                        executeClipboardCopy(data.shortUrl);
                    } else {
                        throw new Error(data.error);
                    }
                })
    
            } catch (err) {
                console.error("Link generation anomaly: ", err);
                alert("Failed to build compressed backup data. Check that text fields do not contain illegal system symbols.");
            }

        }

        function executeClipboardCopy(textToCopy) {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    alert("SUCCESS: Your work snapshot has been saved! The short resume URL has been copied directly to your clipboard.");
                }).catch(() => {
                    fallbackCopyExecute(textToCopy);
                });
            } else {
                fallbackCopyExecute(textToCopy);
            }
        }

        function fallbackCopyExecute(textUrl) {
            const fallbackTextNode = document.createElement("textarea");
            fallbackTextNode.value = textUrl;
            fallbackTextNode.style.position = 'fixed'; 
            document.body.appendChild(fallbackTextNode);
            fallbackTextNode.select();
            try {
                document.execCommand("copy");
                alert("SUCCESS: Work snapshot link compiled and copied to clipboard!");
            } catch (err) {
                alert("Link compiled in the address bar display container box above. Please manually triple-click it and choose Copy.");
            }
            document.body.removeChild(fallbackTextNode);
        }

        function checkForUrlResumedState() {
            const urlParams = new URLSearchParams(window.location.search);
            const stateStringToken = urlParams.get('resume');
            if (!stateStringToken) return;
            try {
                const decodedUrlComponentString = atob(stateStringToken);
                const naturalJsonStringData = decodeURIComponent(decodedUrlComponentString);
                const parsed = JSON.parse(naturalJsonStringData);

                if (parsed.chunk) currentChunk = parsed.chunk;
                if (parsed.answers) studentAnswers = parsed.answers;
                if (parsed.sketches) activeCanvasDrawings = parsed.sketches;
                if (parsed.turns) selectedCoilTurns = parsed.turns;

                Object.keys(studentAnswers).forEach(key => {
                    const formElementNode = document.getElementById(key);
                    if (formElementNode) {
                        if (formElementNode.type !== 'radio') {
                            formElementNode.value = studentAnswers[key];
                        }
                    } else {
                        const targetedRadioNode = document.querySelector(`input[name="${key}"][value="${studentAnswers[key]}"]`);
                        if(targetedRadioNode) targetedRadioNode.checked = true;
                    }
                });

                document.querySelectorAll('.workspace-canvas .hw-item').forEach(el => el.remove());
                droppedMagnetCount = 0;

                if (parsed.canvasAssets && Array.isArray(parsed.canvasAssets)) {
                    parsed.canvasAssets.forEach(asset => {
                        executeGenericHWSpawn(asset.type, 0, 0, asset.style);
                    });
                }

                if (parsed.tracksState) {
                    const ts = parsed.tracksState;
                    if (ts.pvcVisible) document.getElementById('pvcTrack').style.display = 'block';
                    if (ts.pvcSanded) document.getElementById('pvcTrack').classList.add('sanded');
                    if (ts.spacerVisible) document.getElementById('vSpacer').style.display = 'block';
                    if (ts.chassisVisible) document.getElementById('vChassis').style.display = 'block';
                    if (ts.tapeLVisible) {
                        document.getElementById('vTapeL').style.display = 'block';
                        document.getElementById('vTapeR').style.display = 'block';
                    }
                    if (ts.coilVisible) document.getElementById('vCoil').style.display = 'block';
                    if (ts.leadsStripped) {
                        document.getElementById('vLeadL').classList.add('stripped');
                        document.getElementById('vLeadR').classList.add('stripped');
                    }
                    if (ts.shieldVisible) document.getElementById('vShield').style.display = 'block';
                }

                setTimeout(() => { evaluateSandboxPhysics(); }, 200);
                alert("SUCCESS: Your previous physical laboratory workflow records have been fully recovered!");
            } catch(e) {
                console.error("Data reconstruction failure details:", e);
                alert("ERROR: The resume link appears corrupted or clipped by the browser shell architecture.");
            }
        }

        function exportCompletePacketsToPDF() {
            let layoutHtml = `
                <html>
                <head>
                    <title>NYS Physics Investigation Portfolio - Automated Export</title>
                    <style>
                        body { font-family: 'Segoe UI', Arial, sans-serif; padding: 35px; color: #1a202c; line-height: 1.5; }
                        .report-header { text-align: center; border-bottom: 3px double #2b5797; padding-bottom: 12px; margin-bottom: 25px; }
                        h1 { color: #2b5797; margin: 0; font-size: 22px; }
                        h2 { color: #1f4070; font-size: 16px; margin-top: 20px; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; text-transform: uppercase; }
                        .data-row { margin-bottom: 12px; padding: 10px; background: #f8fafc; border-left: 4px solid #94a3b8; }
                        .label-str { font-weight: bold; font-size: 12px; color: #475569; text-transform: uppercase; }
                        .value-str { font-size: 14px; margin-top: 4px; white-space: pre-wrap; color: #0f172a; }
                        .canvas-snapshot { border: 1px dashed #64748b; background: #ffffff; margin-top: 8px; display: block; max-height: 140px; }
                        .page-break { page-break-before: always; margin-top: 30px; border-top: 2px dashed #94a3b8; padding-top: 15px; }
                    </style>
                </head>
                <body>
                    <div class="report-header">
                        <h1>New York State Laboratory Examination Portfolio</h1>
                        <p style="margin: 4px 0 0 0; font-style: italic; font-size: 13px;">Physical Setting - Physics / Electromagnetic Induction Division</p>
                    </div>

                    <h2>[Packet 1: Active Laboratory Run Metrics & Records]</h2>
            `;

            const manifestFieldsList = [
                { id: 'p1_wire_strategy', label: 'Inductive Wire Volume Selection Matrix Counter' },
                { id: 'p1_i3_predict', label: 'Item 3 - Core Field Needle Deflection Predictions' },
                { id: 'p1_i4_toolname', label: 'Item 4 - Target Field Indicator Tool Name' },
                { id: 'p1_i4_evidence', label: 'Item 4 - Target Observed Indicator Presence Metrics Option' },
                { id: 'p1_i4_mechanism', label: 'Item 4 - Indicator Intersecting Field Line Vector Mechanics Explanation' },
                { id: 'p1_i5_bom', label: 'Item 5 - Baseline Electromagnet Bill of Materials Index List' },
                { id: 'p1_i6_procedure', label: 'Item 6 - Operational Workflow Sequencing Descriptions' },
                { id: 'p1_i7_circuit_sketch', label: 'Item 7 - Geometric Circuit Connection Blueprint Diagram', type: 'sketch' },
                { id: 'p1_i11_observations', label: 'Item 11 - Captured Test Run Dashboard Real-time Observations' },
                { id: 'p1_i12_conclusions', label: 'Item 12 - Localized Magnetic Vector Formation Proof Synthesis' },
                { id: 'p1_i13_modplan', label: 'Item 13 - Uprooted Modification System Specification Blueprint' },
                { id: 'p1_i14_mod_obs', label: 'Item 14 - Upgraded Core High-Permeability Observation Metrics' },
                { id: 'p1_i15_mod_con', label: 'Item 15 - Substrate Domain Alignment Core Alterations Statement' },
                { id: 'p1_i17_induction_method', label: 'Item 17 - Chosen Flux Modulation Mechanical Velocity Path Type' },
                { id: 'p1_i18_ind_tool', label: 'Item 18 - Dynamic Induction Diagnostic Capture Instrument Name' },
                { id: 'p1_i18_ind_evidence', label: 'Item 18 - Evidentiary Manifest Potential Spike Choice Selection' },
                { id: 'p1_i18_ind_physics', label: 'Item 18 - Open Terminal Potential Generations Mechanics Summary' },
                { id: 'p1_i19_ind_bom', label: 'Item 19 - Induction Matrix Configuration Full Materials Requirements List' },
                { id: 'p1_i20_ind_proc', label: 'Item 20 - Dynamic Flux Trajectory Induction Lab Workflow Steps' },
                { id: 'p1_i21_ind_sketch', label: 'Item 21 - Expected Induction Current Flow Path Vector Map Sketch', type: 'sketch' },
                { id: 'p1_i25_ind_obs', label: 'Item 25 - Multimeter Screen Snapshot Volumetric Volts Log' },
                { id: 'p1_i26_ind_con', label: 'Item 26 - Intersecting Vector Frequency Rates vs Peak Output Analysis' },
                { id: 'p1_i29_thresh_obs', label: 'Item 29 - Semiconductor Bandgap Breakdown Energy Flash Thresholds Delta Log' }
            ];

            manifestFieldsList.forEach(item => {
                if (item.type === 'sketch') {
                    const sketchSrc = activeCanvasDrawings[item.id];
                    layoutHtml += `
                        <div class="data-row">
                            <div class="label-str">${item.label}</div>
                            ${sketchSrc ? `<img class="canvas-snapshot" src="${sketchSrc}"/>` : `<div class="value-str" style="color:#a0aec0; font-style:italic;">[No visual blueprint elements drawn onto tracking canvas layout]</div>`}
                        </div>
                    `;
                } else {
                    const ans = studentAnswers[item.id] || "[No Student Metrics Recorded]";
                    layoutHtml += `
                        <div class="data-row">
                            <div class="label-str">${item.label}</div>
                            <div class="value-str">${ans}</div>
                        </div>
                    `;
                }
            });

            layoutHtml += `
                <div class="page-break"></div>
                <h2>[Packet 2: Post-Lab Independent Summative Review - 8 Questions Block]</h2>
                
                <div class="data-row">
                    <div class="label-str">Question 1: Loop Alteration Structural Design Mechanical Changes</div>
                    <div class="value-str">${studentAnswers['p2_q1'] || "[No Student Metrics Recorded]"}</div>
                </div>
                <div class="data-row">
                    <div class="label-str">Question 2a: Core Resistance Reduction Field Strength Output Shift Option</div>
                    <div class="value-str">${studentAnswers['p2_q2a'] ? "The produced field becomes: " + studentAnswers['p2_q2a'] : "[No Option Selected]"}</div>
                </div>
                <div class="data-row">
                    <div class="label-str">Question 2b: Ohm's Law and Flux Vectors Mathematical Justification</div>
                    <div class="value-str">${studentAnswers['p2_q2b'] || "[No Student Metrics Recorded]"}</div>
                </div>
                <div class="data-row">
                    <div class="label-str">Question 3: Wrapped Coil Loops Steady-State DC Field Magnetic Vector Blueprint Map</div>
                    ${activeCanvasDrawings['p2_q3_sketch'] ? `<img class="canvas-snapshot" src="${activeCanvasDrawings['p2_q3_sketch']}"/>` : `<div class="value-str" style="color:#a0aec0; font-style:italic;">[No Vector Maps Visualized]</div>`}
                </div>
                <div class="data-row">
                    <div class="label-str">Question 4: Microscopic Field Transformations and Electron Drift Velocity Work Logs</div>
                    <div class="value-str">${studentAnswers['p2_q4'] || "[No Student Metrics Recorded]"}</div>
                </div>
                <div class="data-row">
                    <div class="label-str">Question 5a: Velocity Changes vs Peak Faraday Induction Potentials Coefficient Response</div>
                    <div class="value-str">${studentAnswers['p2_q5a'] || "[No Student Metrics Recorded]"}</div>
                </div>
                <div class="data-row">
                    <div class="label-str">Question 5b: Multimeter Display Refresh Delays and Missing Peaks Trend Analysis</div>
                    <div class="value-str">${studentAnswers['p2_q5b'] || "[No Student Metrics Recorded]"}</div>
                </div>
                <div class="data-row">
                    <div class="label-str">Question 6: Lenz's Law and Conservation of Energy Transformation Boundaries Statement</div>
                    <div class="value-str">${studentAnswers['p2_q6'] || "[No Student Metrics Recorded]"}</div>
                </div>
                <div class="data-row">
                    <div class="label-str">Question 7: Motionless Neodymium Stack Zero Induction Cross-Sectional Geometry Flux Blueprint</div>
                    ${activeCanvasDrawings['p2_q7_sketch'] ? `<img class="canvas-snapshot" src="${activeCanvasDrawings['p2_q7_sketch']}"/>` : `<div class="value-str" style="color:#a0aec0; font-style:italic;">[No Geometric Flux Formations Rendered]</div>`}
                </div>
                <div class="data-row">
                    <div class="label-str">Question 8a: Dynamic Moving-Coil Microphone Diaphragm Signal Expansion Proposal</div>
                    <div class="value-str">${studentAnswers['p2_q8a'] || "[No Student Metrics Recorded]"}</div>
                </div>
                <div class="data-row">
                    <div class="label-str">Question 8b: Microscopic Acoustic Energy Amplitude to Voltage Conversion Relationship</div>
                    <div class="value-str">${studentAnswers['p2_q8b'] || "[No Student Metrics Recorded]"}</div>
                </div>

                <script>window.onload = function() { window.print(); }<\/script>
                </body>
                </html>
            `;

            const compilationFrameWindow = window.open("", "_blank");
            compilationFrameWindow.document.open();
            compilationFrameWindow.document.write(layoutHtml);
            compilationFrameWindow.document.close();
        }
    