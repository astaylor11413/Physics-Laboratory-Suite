
        let deployedHardwareTokens = {};
        let switchClosedState = false;
        let rigConstructionLevel = 0;
        let validatedTeacherSignoffs = { 1: false, 2: false, 3: false, 4: false };

        const STORAGE_KEY = 'InductionJunction_Workspace_State';

        window.addEventListener('DOMContentLoaded', async () => {
            // 1. Force the app to wait until the URL check (and network fetch) is 100% complete
            await checkAndLoadUrlState();
            
            // 2. Now that localStorage is guaranteed to have the cloud state data, load it safely
            loadProgressFromStorage();
            
            // 3. Attach your DOM input and change event handlers
            attachSaveListeners();
        });

        function switchMasterView(viewId) {
            document.getElementById('masterNavBtn-1').classList.toggle('active-tab', viewId === 1);
            document.getElementById('masterNavBtn-2').classList.toggle('active-tab', viewId === 2);
            document.getElementById('packetPanelSection-1').style.display = (viewId === 1) ? 'block' : 'none';
            document.getElementById('packetPanelSection-2').style.display = (viewId === 2) ? 'block' : 'none';
        }

        function navigateP1Section(partId) {
            for (let i = 1; i <= 4; i++) {
                document.getElementById(`p1TabBtn-${i}`).classList.toggle('active-sub', i === partId);
                document.getElementById(`p1Block-${i}`).style.display = (i === partId) ? 'block' : 'none';
            }
        }

        function switchSubTab(mode) {
            document.getElementById('subBtnBench').classList.toggle('active-sub', mode === 'bench');
            document.getElementById('subBtnRig').classList.toggle('active-sub', mode === 'rig');
            document.getElementById('workbenchPanelContainer').style.display = mode === 'bench' ? 'block' : 'none';
            document.getElementById('rigGuidePanelContainer').style.display = mode === 'rig' ? 'block' : 'none';
        }

        function handleNameSynchronization() {
            const nameVal = document.getElementById('packetNameInput').value.trim();
            outputLogStream(`[System Sync] Active student identity logged: "${nameVal || "Anonymous Laboratory Participant"}"`);
            saveProgressToStorage();
        }

        function executeStepAssembly(stepNum, avoidSave = false) {
            if (stepNum !== rigConstructionLevel + 1) return;
            rigConstructionLevel = stepNum;

            updateRigVisualRepresentation();

            const activeBlock = document.getElementById(`visualStepBlock-${stepNum}`);
            activeBlock.style.borderLeftColor = "#38a169";
            activeBlock.style.opacity = "0.85";
            activeBlock.querySelector('strong').style.color = "#38a169";

            if (stepNum < 5) {
                const nextBlock = document.getElementById(`visualStepBlock-${stepNum + 1}`);
                nextBlock.style.opacity = "1";
                nextBlock.style.cursor = "pointer";
                nextBlock.querySelector('strong').style.color = "#38bdf8";
            }

            if (!avoidSave) {
                switchSubTab('bench');
                outputLogStream(`[Build Engine] Visual Spool Assembly Step ${stepNum} drawn onto layout framework.`);
                saveProgressToStorage();
            }
        }

        function updateRigVisualRepresentation() {
            if (rigConstructionLevel >= 1) {
                document.getElementById('pvcLayerGraphic').style.display = 'flex';
                document.getElementById('visualRigStatusLabel').innerText = "RIG: 2-FT PVC TUBE CORING";
            }
            if (rigConstructionLevel >= 2) {
                document.getElementById('spacerLayerGraphic').style.display = 'block';
                document.getElementById('visualRigStatusLabel').innerText = "RIG: 3x5 CARD SLEEVE";
            }
            if (rigConstructionLevel >= 3) {
                document.getElementById('frameLayerGraphic').style.display = 'block';
                document.getElementById('visualRigStatusLabel').innerText = "RIG: 5x8 CARD SPOOL WALLS";
            }
            if (rigConstructionLevel >= 4) {
                document.getElementById('coilLayerGraphic').style.display = 'block';
                document.getElementById('visualRigStatusLabel').innerText = "RIG: 28 AWG COIL TURNS";
            }
            if (rigConstructionLevel >= 5) {
                document.getElementById('tapeLayerGraphic').style.display = 'block';
                document.getElementById('visualRigStatusLabel').innerText = "RIG: PACKAGING TAPE SEALED";
                evaluateDropSimulationLock();
            }
        }

        function adjustRigTurns() {
            const turns = document.getElementById('turnControl').value;
            const coils = document.getElementById('coilLayerGraphic');
            if (rigConstructionLevel >= 4) {
                if (turns === "500") {
                    coils.style.width = "48px";
                    coils.style.background = "repeating-linear-gradient(0deg, #b7791f, #b7791f 1px, #dd6b20 1px, #dd6b20 3px)";
                    outputLogStream("[Rig Engine] Re-wound structural spools to high-density 500-turn configurations.");
                } else {
                    coils.style.width = "42px";
                    coils.style.background = "repeating-linear-gradient(0deg, #b7791f, #b7791f 2px, #dd6b20 2px, #dd6b20 4px)";
                    outputLogStream("[Rig Engine] Re-wound structural spools to default 300-turn parameters.");
                }
            }
            evaluatePhysicsEquations();
            saveProgressToStorage();
        }

        function grantTeacherSignoff(partNum) {
            const name = document.getElementById('packetNameInput').value.trim();
            if (!name) {
                alert("Teacher Action Required: Enter your name in the header field before submitting plans for inspection.");
                return;
            }
            validatedTeacherSignoffs[partNum] = true;
            outputLogStream(`[Teacher Sign-off] Approved Session 1 Part ${partNum} design strategy matrix documentation.`);
            alert(`✓ Teacher verification check passed for Part ${partNum}!`);
            evaluateDropSimulationLock();
            evaluatePhysicsEquations();
            saveProgressToStorage();
        }

        function evaluateDropSimulationLock() {
            const btn = document.getElementById('btnDropMagnetSimulation');
            if (rigConstructionLevel >= 4 && deployedHardwareTokens.magnet) {
                btn.disabled = false;
            } else {
                btn.disabled = true;
            }
        }

        function allocateAsset(type, x = null, y = null) {
            if (deployedHardwareTokens[type]) return;
            deployedHardwareTokens[type] = true;

            const baseFloor = document.getElementById('workbenchCanvas');
            const token = document.createElement('div');
            token.id = `tokenElement-${type}`;
            token.className = `draggable-component comp-${type}`;
            
            token.style.left = x !== null ? x : (Math.floor(Math.random() * 80) + 140) + 'px';
            token.style.top = y !== null ? y : (Math.floor(Math.random() * 80) + 70) + 'px';

            if (type === 'battery') token.innerText = "1.5V Cell";
            if (type === 'switch') {
                token.innerText = switchClosedState ? "🔌 Switch: CLOSED" : "Switch: OPEN";
                token.style.background = switchClosedState ? "#166534" : "#7c2d12";
                token.onclick = (e) => { e.stopPropagation(); toggleKnifeSwitchHardware(); };
            }
            if (type === 'nail') token.innerText = "Iron Nail";
            if (type === 'compass') {
                token.innerHTML = '<div class="needle" id="liveCompassNeedleNode"></div>';
            }
            if (type === 'magnet') {
                token.innerHTML = '<span>N</span><br><span>S</span>';
                evaluateDropSimulationLock();
            }
            if (type === 'led') token.id = "liveLedTokenNode";
            if (type === 'multimeter') {
                token.innerHTML = '<div style="font-size:7px;">V / A METER</div><div class="lcd" id="liveLcdOutputNode">0.00 V<br>0.00 A</div>';
            }

            token.ondblclick = (e) => { e.stopPropagation(); removeAssetToken(type); };
            baseFloor.appendChild(token);
            bindDraggableMechanisms(token);
            evaluatePhysicsEquations();
            
            if (x === null) {
                outputLogStream(`[Hardware Matrix] Allocated functional ${type} node to bench array.`);
                saveProgressToStorage();
            }
        }

        function removeAssetToken(type) {
            const targetId = (type === 'led') ? "liveLedTokenNode" : `tokenElement-${type}`;
            const element = document.getElementById(targetId);
            if (element) {
                element.remove();
                delete deployedHardwareTokens[type];
                if (type === 'switch') switchClosedState = false;
                if (type === 'magnet') evaluateDropSimulationLock();
                evaluatePhysicsEquations();
                outputLogStream(`[Hardware Matrix] Removed ${type} node from active bench grid.`);
                saveProgressToStorage();
            }
        }

        function toggleKnifeSwitchHardware() {
            if (!deployedHardwareTokens.switch) return;
            switchClosedState = !switchClosedState;
            const sw = document.getElementById('tokenElement-switch');
            if (sw) {
                sw.innerText = switchClosedState ? "🔌 Switch: CLOSED" : "Switch: OPEN";
                sw.style.background = switchClosedState ? "#166534" : "#7c2d12";
            }
            evaluatePhysicsEquations();
            saveProgressToStorage();
        }

        function checkOverlapWithCoil(elementId) {
            const element = document.getElementById(elementId);
            const coil = document.getElementById('structuralVisualizer');
            if (!element || !coil || rigConstructionLevel < 4) return false;

            const r1 = element.getBoundingClientRect();
            const r2 = coil.getBoundingClientRect();

            return !(r1.right < r2.left || 
                     r1.left > r2.right || 
                     r1.bottom < r2.top || 
                     r1.top > r2.bottom);
        }

        function evaluatePhysicsEquations() {
            const status = document.getElementById('telemetryStatusBar');
            const needle = document.getElementById('liveCompassNeedleNode');
            const lcd = document.getElementById('liveLcdOutputNode');
            const ledNode = document.getElementById('liveLedTokenNode');

            if (deployedHardwareTokens.battery && validatedTeacherSignoffs[3] && !validatedTeacherSignoffs[4]) {
                status.innerText = "CRITICAL LAB RULE VIOLATION: Using batteries during Session 1 Part 3 is prohibited!";
                status.style.background = "#ef4444";
                status.style.color = "white";
                return;
            } else {
                status.style.background = "rgba(15, 23, 42, 0.9)";
                status.style.color = "#94a3b8";
            }

            // check real-time drag overlap induction for the Iron Nail or Neodymium Magnet
            const nailInducing = checkOverlapWithCoil('tokenElement-nail');
            const magnetInducing = checkOverlapWithCoil('tokenElement-magnet');

            if ((nailInducing || magnetInducing) && !deployedHardwareTokens.battery) {
                let turns = parseInt(document.getElementById('turnControl').value || 300);
                let multiplier = nailInducing ? 1.1 : 2.5; 
                if (nailInducing && deployedHardwareTokens.magnet) multiplier *= 1.8; 

                let inducedVolts = (turns / 300) * multiplier * (Math.random() * 0.4 + 0.8);
                let inducedAmps = inducedVolts / 1.5;

                if (lcd && deployedHardwareTokens.multimeter) {
                    lcd.innerHTML = `${inducedVolts.toFixed(2)} V<br>${inducedAmps.toFixed(2)} A`;
                }
                if (ledNode) {
                    ledNode.style.backgroundColor = "#eab308";
                    ledNode.style.boxShadow = "0 0 20px #eab308";
                }
                status.innerText = `Dynamic Induction: Moving object through the coil turns! Generated ${inducedVolts.toFixed(2)} V.`;
                return;
            } else {
                if (ledNode) {
                    ledNode.style.backgroundColor = "#475569";
                    ledNode.style.boxShadow = "none";
                }
            }

            // Battery and Compass dynamic induction tracking
            if (deployedHardwareTokens.battery && deployedHardwareTokens.compass) {
                let currentAmps = (deployedHardwareTokens.switch && switchClosedState) ? 1.45 : 0.00;
                let deviationDegrees = (deployedHardwareTokens.switch && switchClosedState) ? 45 : 18;

                if (rigConstructionLevel >= 4 && document.getElementById('turnControl').value === "500") deviationDegrees += 20;
                if (deployedHardwareTokens.nail) deviationDegrees += 20;
                if (deviationDegrees > 85) deviationDegrees = 85;

                if (needle) needle.style.transform = `rotate(${deviationDegrees}deg)`;
                
                if (deployedHardwareTokens.switch && switchClosedState && lcd && deployedHardwareTokens.multimeter) {
                    lcd.innerHTML = `0.00 V<br>${currentAmps.toFixed(2)} A`;
                }

                status.innerText = `Magnetic Field Induced: Compass deflected ${deviationDegrees}° via battery circuit.`;
                return;
            }

            // Standard Switch/Battery loop logic
            if (deployedHardwareTokens.battery && deployedHardwareTokens.switch && switchClosedState) {
                if (lcd && deployedHardwareTokens.multimeter) lcd.innerHTML = `0.00 V<br>1.45 A`;
                status.innerText = `Electromagnet Circuit Active: Loop Current = 1.45 A`;
                return;
            }

            if (lcd && deployedHardwareTokens.multimeter) lcd.innerHTML = "0.00 V<br>0.00 A";
            if (needle) needle.style.transform = "rotate(0deg)";
            status.innerText = "Status: Monitoring loops. Configure or drag items to display real-time metrics.";
        }

        function executeFaradayDropTrial() {
            if (rigConstructionLevel < 4 || !deployedHardwareTokens.magnet || deployedHardwareTokens.battery) return;

            const magnetNode = document.getElementById('tokenElement-magnet');
            const nailNode = document.getElementById('tokenElement-nail');
            const ledNode = document.getElementById('liveLedTokenNode');
            const meterLcd = document.getElementById('liveLcdOutputNode');
            
            let turns = parseInt(document.getElementById('turnControl').value);
            let baseVolts = (turns / 300) * 1.68 * (Math.random() * 0.12 + 0.94);
            
            if (deployedHardwareTokens.nail) {
                baseVolts *= 1.55; 
                if (nailNode) {
                    nailNode.style.transition = "all 0.32s cubic-bezier(0.5, 0.1, 0.7, 0.4)";
                    nailNode.style.transform = "translateY(160px)";
                }
            }

            let simulatedInducedCurrent = baseVolts / 2.2; 

            if (magnetNode) {
                magnetNode.style.transition = "all 0.32s cubic-bezier(0.5, 0.1, 0.7, 0.4)";
                magnetNode.style.transform = "translateY(160px)";
            }

            setTimeout(() => {
                if (meterLcd && deployedHardwareTokens.multimeter) {
                    meterLcd.innerHTML = `${baseVolts.toFixed(2)} V<br>${simulatedInducedCurrent.toFixed(2)} A`;
                }
                if (ledNode) {
                    ledNode.style.backgroundColor = "#eab308";
                    ledNode.style.boxShadow = "0 0 25px #eab308";
                }
                outputLogStream(`[Faraday Telemetry] Drop Induction! Peak Potential: ${baseVolts.toFixed(2)}V | Current: ${simulatedInducedCurrent.toFixed(2)}A`);
                
                if (validatedTeacherSignoffs[4]) {
                    document.getElementById('p1-q29').value = `Modified Induction Metrics: Generated an adjusted value of ${baseVolts.toFixed(2)} V potential difference.`;
                } else if (validatedTeacherSignoffs[3]) {
                    document.getElementById('p1-q25').value = `Baseline Induction Metrics: Generated an output reading of ${baseVolts.toFixed(2)} V potential difference.`;
                }
                saveProgressToStorage();
            }, 160);

            setTimeout(() => {
                if (magnetNode) {
                    magnetNode.style.transition = "none";
                    magnetNode.style.transform = "none";
                }
                if (nailNode) {
                    nailNode.style.transition = "none";
                    nailNode.style.transform = "none";
                }
                if (ledNode) {
                    ledNode.style.backgroundColor = "#475569";
                    ledNode.style.boxShadow = "none";
                }
                evaluatePhysicsEquations();
            }, 1300);
        }

        function executeStationSanitization() {
            alert("Lab Cleanup Verified! Retracting inventory allocations and resetting workbench surfaces.");
            performMasterReset();
        }

        function outputLogStream(txt) {
            const box = document.getElementById('terminalFeed');
            box.innerText = `${txt}\n` + box.innerText;
        }

        function bindDraggableMechanisms(el) {
            let cx = 0, cy = 0;
            el.onmousedown = (e) => {
                if (el.id === 'tokenElement-switch') return;
                e.preventDefault();
                cx = e.clientX;
                cy = e.clientY;
                document.onmouseup = () => { 
                    document.onmouseup = null; 
                    document.onmousemove = null; 
                    saveProgressToStorage();
                };
                document.onmousemove = (ev) => {
                    let ox = cx - ev.clientX;
                    let oy = cy - ev.clientY;
                    cx = ev.clientX;
                    cy = ev.clientY;
                    
                    let newTop = el.offsetTop - oy;
                    let newLeft = el.offsetLeft - ox;
                    
                    const borderW = document.getElementById('workbenchCanvas').clientWidth - el.clientWidth;
                    const borderH = document.getElementById('workbenchCanvas').clientHeight - el.clientHeight;
                    
                    if (newLeft < 0) newLeft = 0;
                    if (newLeft > borderW) newLeft = borderW;
                    if (newTop < 0) newTop = 0;
                    if (newTop > borderH) newTop = borderH;
                    
                    el.style.top = newTop + "px";
                    el.style.left = newLeft + "px";
                    evaluatePhysicsEquations();
                };
            };
        }
/**Saving and Loading Progress Section */
        let saveTimeout;

        function attachSaveListeners() {
            // Debounced: Prevents rapid-fire triggers while students type answers
            document.querySelectorAll('.autosave-input').forEach(elem => {
                elem.addEventListener('input', () => {
                    const indicator = document.getElementById('saveStatus');
                    if (indicator) {
                        indicator.innerText = "Typing...";
                        indicator.style.color = "#94a3b8";
                    }
                    clearTimeout(saveTimeout);
                    saveTimeout = setTimeout(saveProgressToStorage, 1000); // Wait 1 second after typing stops
                });
            });

            // Instantly saves when a multiple-choice radio button is clicked
            document.querySelectorAll('.autosave-radio').forEach(elem => {
                elem.addEventListener('change', () => {
                    clearTimeout(saveTimeout); // Clear any pending text saves to prevent collisions
                    saveProgressToStorage();   // Save immediately
                });
            });
        }

        function saveProgressToStorage() {
            const indicator = document.getElementById('saveStatus');
            indicator.innerText = "Saving progress...";
            indicator.style.color = "var(--accent-color)";

            const textValues = {};
            document.querySelectorAll('.autosave-input').forEach(elem => {
                textValues[elem.id] = elem.value;
            });

            const radioValues = {};
            document.querySelectorAll('.autosave-radio').forEach(elem => {
                if (elem.checked) radioValues[elem.name] = elem.value;
            });

            const componentPositions = {};
            Object.keys(deployedHardwareTokens).forEach(type => {
                const targetId = (type === 'led') ? "liveLedTokenNode" : `tokenElement-${type}`;
                const el = document.getElementById(targetId);
                if (el) {
                    componentPositions[type] = { left: el.style.left, top: el.style.top };
                }
            });

            const fullStatePayload = {
                studentName: document.getElementById('packetNameInput').value,
                textFields: textValues,
                radioFields: radioValues,
                rigLevel: rigConstructionLevel,
                turnDensity: document.getElementById('turnControl').value,
                switchClosed: switchClosedState,
                signoffs: validatedTeacherSignoffs,
                hardwareTokens: componentPositions
            };

            localStorage.setItem(STORAGE_KEY, JSON.stringify(fullStatePayload));
            
            setTimeout(() => {
                indicator.innerText = "All work saved locally";
                indicator.style.color = "#e2e8f0";
            }, 400);
        }

        function loadProgressFromStorage() {
            const rawPayload = localStorage.getItem(STORAGE_KEY);
            if (!rawPayload) return;

            try {
                const payload = JSON.parse(rawPayload);
                
                if (payload.studentName) {
                    document.getElementById('packetNameInput').value = payload.studentName;
                }

                if (payload.textFields) {
                    Object.keys(payload.textFields).forEach(id => {
                        const elem = document.getElementById(id);
                        if (elem) elem.value = payload.textFields[id];
                    });
                }

                if (payload.radioFields) {
                    Object.keys(payload.radioFields).forEach(name => {
                        const val = payload.radioFields[name];
                        const radio = document.querySelector(`input[name="${name}"][value="${val}"]`);
                        if (radio) radio.checked = true;
                    });
                }

                if (payload.signoffs) validatedTeacherSignoffs = payload.signoffs;
                if (payload.turnDensity) {
                    document.getElementById('turnControl').value = payload.turnDensity;
                }
                if (payload.switchClosed) switchClosedState = payload.switchClosed;

                if (payload.rigLevel) {
                    const targetLevel = payload.rigLevel;
                    rigConstructionLevel = 0;
                    for (let step = 1; step <= targetLevel; step++) {
                        executeStepAssembly(step, true);
                    }
                }

                if (payload.hardwareTokens) {
                    Object.keys(payload.hardwareTokens).forEach(type => {
                        const pos = payload.hardwareTokens[type];
                        allocateAsset(type, pos.left, pos.top);
                    });
                }

                updateRigVisualRepresentation();
                adjustRigTurns();
                evaluatePhysicsEquations();
                outputLogStream("[System Matrix] Previous laboratory session state successfully restored.");

            } catch (err) {
                console.error("Failed to parse local save data:", err);
            }
        }

        async function checkAndLoadUrlState() {
            const urlParams = new URLSearchParams(window.location.search);
            const shareId = urlParams.get('id');
        
            if (shareId) {
                try {
                    const response = await fetch(`/api/load-state/${shareId}`);
                    const data = await response.json();
        
                    if (data.state) {
                        // Safely commit it to local storage
                        localStorage.setItem(STORAGE_KEY, JSON.stringify(data.state));
                        
                        // Clean up the URL bar
                        window.history.replaceState({}, document.title, window.location.pathname);
                        console.log("Lab state successfully cached from cloud backup!");
                    }
                } catch (error) {
                    console.error("Error pulling physics state from Flask:", error);
                }
            }
        }     

        async function generateShareLink() {
            const currentStateString = localStorage.getItem(STORAGE_KEY); 

            if (!currentStateString) {
                alert("No lab progress found to share! Make sure you've started the lab.");
                return;
            }

            try {
                const payloadObject = JSON.parse(currentStateString);

                // Dispatches structural frame straight to protected python endpoint
                const response = await fetch('/api/save-state', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ state: payloadObject }) 
                });

                const data = await response.json();
        
                // Integrity Validation Catch:
                if (!response.ok || !data || !data.shareId) {
                    throw new Error(data.error || "The database server rejected the request framework or returned an empty payload token.");
                }

                 const shareUrl = new URL(window.location.origin);
                shareUrl.searchParams.set('id', data.shareId);
        
                // Copy link output safely straight to clipboard
                executeClipboardCopy(shareUrl.href);
                return shareUrl.href;

            } catch (err) {
                console.error("Link generation execution matrix failure:", err);
                alert(`Could not process snapshot configuration link: ${err.message}\n\nTip: If you're seeing this, wait 10 seconds and try hitting save again!`);
            }
        }

        function executeClipboardCopy(textToCopy) {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    alert("SUCCESS: Your work snapshot has been saved! The resume URL has been copied directly to your clipboard.");
                }).catch(() => {
                    // If the browser clipboard API is blocked by security, run your original fallback strategy
                    if (typeof fallbackCopyExecute === "function") {
                        fallbackCopyExecute(textToCopy);
                    } else {
                        alert("Saved! Copy your link from the screen text box.");
                    }
                });
            } else {
                if (typeof fallbackCopyExecute === "function") {
                    fallbackCopyExecute(textToCopy);
                } else {
                    alert("Saved! Copy your link from the screen text box.");
                }
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
        
        function performMasterReset() {
            if (!confirm("Are you sure you want to permanently clear your lab workbench progress?")) return;
            
            // 1. Remove draggable visual elements from canvas
            const tokens = document.querySelectorAll('.draggable-component');
            tokens.forEach(t => t.remove());
        
            // 2. Reset global hardware state variables to baseline
            deployedHardwareTokens = {};
            switchClosedState = false;
            rigConstructionLevel = 0;
            validatedTeacherSignoffs = { 1: false, 2: false, 3: false, 4: false };
        
            // 3. Reset hardware UI graphics and text labels
            document.getElementById('pvcLayerGraphic').style.display = 'none';
            document.getElementById('spacerLayerGraphic').style.display = 'none';
            document.getElementById('frameLayerGraphic').style.display = 'none';
            document.getElementById('coilLayerGraphic').style.display = 'none';
            document.getElementById('tapeLayerGraphic').style.display = 'none';
            document.getElementById('visualRigStatusLabel').innerText = "NO TUBE INSTALLED";
            document.getElementById('btnDropMagnetSimulation').disabled = true;
        
            // 4. Sync the remaining physical interactive sliders and switches to baseline
            document.getElementById('turnControl').value = 100; // Assuming 100 is your default slider minimum
            const physicalSwitch = document.getElementById('circuitSwitchCheckbox'); // Update ID if different
            if (physicalSwitch) physicalSwitch.checked = false; 
        
            // 5. Reset progress step sidebar block configurations
            for (let i = 1; i <= 5; i++) {
                const block = document.getElementById(`visualStepBlock-${i}`);
                if (block) {
                    block.style.opacity = i === 1 ? "1" : "0.4";
                    block.style.cursor = i === 1 ? "pointer" : "not-allowed";
                    block.style.borderLeftColor = "#64748b";
                    const strongTag = block.querySelector('strong');
                    if (strongTag) strongTag.style.color = i === 1 ? "#38bdf8" : "#64748b";
                }
            }
        
            // 6. Update logger timeline, recalculate, and push delta straight to storage key!
            document.getElementById('terminalFeed').innerText = "Lab environment rig state cleared to baseline standards.";
            evaluatePhysicsEquations();
            
            // This uses your clean variables, keeps the student's text, and saves it all!
            saveProgressToStorage();
        }

        function triggerSystemPdfExport() {
            const studentName = document.getElementById('packetNameInput').value.trim() || "Unassigned_Student";
            outputLogStream(`[PDF Engine] Transforming workspace snapshot for portfolio processing: ${studentName}`);
            
            const originalTitle = document.title;
            document.title = `NYSED_Physics_Induction_Junction_Portfolio_${studentName.replace(/\s+/g, '_')}`;
            
            window.print();
            document.title = originalTitle;
        }

// =====================================================================
// AUTOMATED HEARTBEAT: Streams a class progress snapshot every 5 mins
// =====================================================================
setInterval(function() {
    const studentName = document.getElementById('packetNameInput')?.value.trim();
    if (!studentName) return; 

    // Extract text values safely
    const textValues = {};
    document.querySelectorAll('.autosave-input').forEach(elem => { textValues[elem.id] = elem.value; });

    // Extract radio selections safely
    const radioValues = {};
    document.querySelectorAll('.autosave-radio').forEach(elem => {
        if (elem.checked) radioValues[elem.name] = elem.value;
    });

    // Extract component visual coordinates safely
    const componentPositions = {};
    if (typeof deployedHardwareTokens !== 'undefined') {
        Object.keys(deployedHardwareTokens).forEach(type => {
            const targetId = (type === 'led') ? "liveLedTokenNode" : `tokenElement-${type}`;
            const el = document.getElementById(targetId);
            if (el) componentPositions[type] = { left: el.style.left, top: el.style.top };
        });
    }

    // 1. Build the identical payload structure used by the manual button
    const fullStatePayload = {
        studentName: studentName,
        textFields: textValues,
        radioFields: radioValues,
        rigLevel: typeof rigConstructionLevel !== 'undefined' ? rigConstructionLevel : 0,
        turnDensity: document.getElementById('turnControl')?.value || 100,
        switchClosed: typeof switchClosedState !== 'undefined' ? switchClosedState : false,
        signoffs: typeof validatedTeacherSignoffs !== 'undefined' ? validatedTeacherSignoffs : {},
        hardwareTokens: componentPositions
    };

    console.log("Transmitting structured payload frame to Looker Studio backend...");

    // 2. Pass it with the explicit 'state' wrapper so Python processes it normally!
    fetch('/api/save-state', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            isHeartbeat: true,
            state: fullStatePayload // Matches the manual save button perfectly!
        })
    })
    .then(res => res.json())
    .then(data => console.log("[Heartbeat Matrix Sync Complete]:", data.status))
    .catch(err => console.warn("Background clock sync paused: ", err));

}, 5 * 60 * 1000);